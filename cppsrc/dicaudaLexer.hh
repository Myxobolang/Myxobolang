#ifndef __DICAUDA_LEXER_HH__
#define __DICAUDA_LEXER_HH__

#include <napi.h>

#ifndef __FLEX_LEXER_H
class yyFlexLexer
{
public:
    yyFlexLexer(std::istream *in);
};
#endif

class DicaudaLexer : public yyFlexLexer
{
private:
    int row;
    int col;

public:
    DicaudaLexer(std::istream *in = nullptr) : yyFlexLexer(in), row(0), col(0) {}
    int getRow() { return row; }
    int getCol() { return col; }
    int yylex();
};

namespace dicaudaLexer
{
    Napi::External<DicaudaLexer> initLexer(const Napi::CallbackInfo &info);
    void deleteLexer(const Napi::CallbackInfo &info);
    Napi::Object lex(const Napi::CallbackInfo &info);
    Napi::Object init(Napi::Env env, Napi::Object exports);
}
#endif