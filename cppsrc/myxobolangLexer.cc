#include <FlexLexer.h>
#include "myxobolangLexer.hh"

#undef yyFlexLexer
#define yyFlexLexer mxFlexLexer

#include <fstream>
#include <sstream>

using namespace Napi;

External<MyxobolangLexer> myxobolangLexer::initLexer(const CallbackInfo &info)
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
        auto lexer = new MyxobolangLexer(f);
        return External<MyxobolangLexer>::New(env, lexer);
    }

    if (info.Length() == 2)
    {
        if (!info[0].IsString())
            TypeError::New(env, "Invalid parameter").ThrowAsJavaScriptException();
        auto source = info[0].As<String>().Utf8Value();
        auto s = new std::stringstream(source);
        auto lexer = new MyxobolangLexer(s);
        return External<MyxobolangLexer>::New(env, lexer);
    }

    auto lexer = new MyxobolangLexer();
    return External<MyxobolangLexer>::New(env, lexer);
}

void myxobolangLexer::deleteLexer(const CallbackInfo &info)
{
    Env env = info.Env();
    if (info.Length() < 1 || !info[0].IsExternal())
        TypeError::New(env, "Invalid parameter").ThrowAsJavaScriptException();

    auto lexer = info[0].As<External<MyxobolangLexer>>().Data();
    delete lexer;
}

Object myxobolangLexer::lex(const CallbackInfo &info)
{
    Env env = info.Env();
    if (info.Length() < 1 || !info[0].IsExternal())
        TypeError::New(env, "Invalid parameter").ThrowAsJavaScriptException();

    auto lexer = info[0].As<External<MyxobolangLexer>>().Data();
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

Object myxobolangLexer::init(Env env, Object exports)
{
    exports.Set("initLexer", Function::New(env, myxobolangLexer::initLexer));
    exports.Set("deleteLexer", Function::New(env, myxobolangLexer::deleteLexer));
    exports.Set("lex", Function::New(env, myxobolangLexer::lex));
    return exports;
}
