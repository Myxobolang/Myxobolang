#ifndef __KUDOALEXER_HH__
#define __KUDOALEXER_HH__

#include <napi.h>

class KudoaLexer : public yyFlexLexer
{
private:
    int row;
    int col;

public:
    KudoaLexer(std::istream *in = nullptr) : yyFlexLexer(in), row(0), col(0) {}
    int getRow() { return row; }
    int getCol() { return col; }
    int yylex();
};

namespace kudoaLexer {
    External<KudoaLexer> initLexer(const CallbackInfo &info);
    void deleteLexer(const CallbackInfo &info);
    Object lex(const CallbackInfo &info);
    Napi::Object init(Napi::Env env, Napi::Object exports);
}
#endif