#ifndef __LEXER_HH__
#define __LEXER_HH__

class Lexer : public yyFlexLexer
{
private:
    int row;
    int col;

public:
    Lexer(std::istream *in = nullptr) : yyFlexLexer(in), row(0), col(0) {}
    int getRow() { return row; }
    int getCol() { return col; }
    int yylex();
};

#endif