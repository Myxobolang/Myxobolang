#ifndef __MYXOBOLANGLEXER_HH__
#define __MYXOBOLANGLEXER_HH__

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

namespace myxobolangLexer {
    extern External<MyxobolangLexer> initLexer(const CallbackInfo &info);
    extern void deleteLexer(const CallbackInfo &info);
    extern Object lex(const CallbackInfo &info);
    extern Napi::Object init(Napi::Env env, Napi::Object exports);
}

#endif