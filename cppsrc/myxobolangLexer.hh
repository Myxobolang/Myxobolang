#ifndef __MYXOBOLANG_LEXER_HH__
#define __MYXOBOLANG_LEXER_HH__

#include <napi.h>

class MyxobolangLexer : public yyFlexLexer
{
private:
    int row;
    int col;

public:
    MyxobolangLexer(std::istream *in = nullptr) : yyFlexLexer(in), row(0), col(0) {}
    int getRow() { return row; }
    int getCol() { return col; }
    int yylex();
};

namespace myxobolangLexer
{
    Napi::External<MyxobolangLexer> initLexer(const Napi::CallbackInfo &info);
    void deleteLexer(const Napi::CallbackInfo &info);
    Napi::Object lex(const Napi::CallbackInfo &info);
    Napi::Object init(Napi::Env env, Napi::Object exports);
}

#endif