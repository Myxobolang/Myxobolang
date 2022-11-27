#include <FlexLexer.h>
#include "kudoaLexer.hh"

#undef yyFlexLexer
#define yyFlexLexer klFlexLexer

#include <fstream>

using namespace Napi;

External<KudoaLexer> kudoaLexer::initLexer(const CallbackInfo &info)
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
        auto lexer = new KudoaLexer(f);
        return External<KudoaLexer>::New(env, lexer);
    }

    auto lexer = new KudoaLexer();
    return External<KudoaLexer>::New(env, lexer);
}

void kudoaLexer::deleteLexer(const CallbackInfo &info)
{
    Env env = info.Env();
    if (info.Length() < 1 || !info[0].IsExternal())
        TypeError::New(env, "Invalid parameter").ThrowAsJavaScriptException();

    auto lexer = info[0].As<External<KudoaLexer>>().Data();
    delete lexer;
}

Object kudoaLexer::lex(const CallbackInfo &info)
{
    Env env = info.Env();
    if (info.Length() < 1 || !info[0].IsExternal())
        TypeError::New(env, "Invalid parameter").ThrowAsJavaScriptException();

    auto lexer = info[0].As<External<KudoaLexer>>().Data();
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

Object kudoaLexer::init(Env env, Object exports)
{
    exports.Set("initLexer", Function::New(env, kudoaLexer::initLexer));
    exports.Set("deleteLexer", Function::New(env, kudoaLexer::deleteLexer));
    exports.Set("lex", Function::New(env, kudoaLexer::lex));
    return exports;
}
