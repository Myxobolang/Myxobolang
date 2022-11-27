#ifndef __CERATOMYXA_LEXER_HH__
#define __CERATOMYXA_LEXER_HH__

#include <napi.h>

#ifndef __FLEX_LEXER_H
class yyFlexLexer
{
public:
    yyFlexLexer(std::istream *in);
};
#endif

class CeratomyxaLexer : public yyFlexLexer
{
private:
    int row;
    int col;

public:
    CeratomyxaLexer(std::istream *in = nullptr) : yyFlexLexer(in), row(0), col(0) {}
    int getRow() { return row; }
    int getCol() { return col; }
    int yylex();
};

namespace ceratomyxaLexer
{
    Napi::External<CeratomyxaLexer> initLexer(const Napi::CallbackInfo &info);
    void deleteLexer(const Napi::CallbackInfo &info);
    Napi::Object lex(const Napi::CallbackInfo &info);
    Napi::Object init(Napi::Env env, Napi::Object exports);
}

#endif