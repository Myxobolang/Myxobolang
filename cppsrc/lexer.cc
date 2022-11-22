#include <FlexLexer.h>
#include "lexer.hh"

#include <napi.h>
#include <fstream>

using namespace Napi;

External<Lexer> initLexer(const CallbackInfo &info)
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
        auto lexer = new Lexer(f);
        return External<Lexer>::New(env, lexer);
    }

    auto lexer = new Lexer();
    return External<Lexer>::New(env, lexer);
}

void deleteLexer(const CallbackInfo &info)
{
    Env env = info.Env();
    if (info.Length() < 1 || !info[0].IsExternal())
        TypeError::New(env, "Invalid parameter").ThrowAsJavaScriptException();

    auto lexer = info[0].As<External<Lexer>>().Data();
    delete lexer;
}

Object lex(const CallbackInfo &info)
{
    Env env = info.Env();
    if (info.Length() < 1 || !info[0].IsExternal())
        TypeError::New(env, "Invalid parameter").ThrowAsJavaScriptException();

    auto lexer = info[0].As<External<Lexer>>().Data();
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

Object init(Env env, Object exports)
{
    exports.Set("initLexer", Function::New(env, initLexer));
    exports.Set("deleteLexer", Function::New(env, deleteLexer));
    exports.Set("lex", Function::New(env, lex));
    return exports;
}

NODE_API_MODULE(NODE_GYP_MODULE_NAME, init)