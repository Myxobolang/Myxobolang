#include <FlexLexer.h>
#include "dicaudaLexer.hh"

#undef yyFlexLexer
#define yyFlexLexer dcFlexLexer

#include <fstream>
#include <sstream>

using namespace Napi;

External<DicaudaLexer> dicaudaLexer::initLexer(const CallbackInfo &info)
{
    Env env = info.Env();
    if (info.Length() == 1)
    {
        if (!info[0].IsString())
            TypeError::New(env, "Invalid parameter").ThrowAsJavaScriptException();

        auto file = info[0].As<String>().Utf8Value();
        auto f = new std::ifstream(file);
        if (!f->is_open())
            Error::New(env, std::string("Cannot open file ") + file).ThrowAsJavaScriptException();
        auto lexer = new DicaudaLexer(f);
        return External<DicaudaLexer>::New(env, lexer);
    }

    if (info.Length() == 2)
    {
        if (!info[0].IsString())
            TypeError::New(env, "Invalid parameter").ThrowAsJavaScriptException();
        auto source = info[0].As<String>().Utf8Value();
        auto s = new std::stringstream(source);
        auto lexer = new DicaudaLexer(s);
        return External<DicaudaLexer>::New(env, lexer);
    }

    auto lexer = new DicaudaLexer();
    return External<DicaudaLexer>::New(env, lexer);
}

void dicaudaLexer::deleteLexer(const CallbackInfo &info)
{
    Env env = info.Env();
    if (info.Length() < 1 || !info[0].IsExternal())
        TypeError::New(env, "Invalid parameter").ThrowAsJavaScriptException();

    auto lexer = info[0].As<External<DicaudaLexer>>().Data();
    delete lexer;
}

Object dicaudaLexer::lex(const CallbackInfo &info)
{
    Env env = info.Env();
    if (info.Length() < 1 || !info[0].IsExternal())
        TypeError::New(env, "Invalid parameter").ThrowAsJavaScriptException();

    auto lexer = info[0].As<External<DicaudaLexer>>().Data();
    auto out = Object::New(env);
    auto result = lexer->yylex();
    auto leng = lexer->YYLeng();
    auto text = lexer->YYText();
    auto row = lexer->getRow();
    auto col = lexer->getCol() - lexer->YYLeng();
    out.Set("result", Value::From<int>(env, result));
    out.Set("leng", Value::From<int>(env, leng));
    out.Set("text", Value::From<const char *>(env, text));
    out.Set("row", Value::From<int>(env, row));
    out.Set("col", Value::From<int>(env, col));
    return out;
}

Object dicaudaLexer::init(Env env, Object exports)
{
    exports.Set("initLexer", Function::New(env, dicaudaLexer::initLexer));
    exports.Set("deleteLexer", Function::New(env, dicaudaLexer::deleteLexer));
    exports.Set("lex", Function::New(env, dicaudaLexer::lex));
    return exports;
}
