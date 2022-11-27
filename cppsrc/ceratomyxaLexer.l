%{
#include "ceratomyxaLexer.hh"
%}

%option noyywrap
%option c++
%option yyclass="CeratomyxaLexer"
%option prefix="cr"

Base64 [A-Za-z0-9\+/]

%%
macro { col += YYLeng(); return 1; }
m_({Base64}|_)+ { col += YYLeng(); return 2; }
v_({Base64}|_)+ { col += YYLeng(); return 3; }
#[^\n]* { col += YYLeng(); }
\n { col = 0; row++; }
[\x20\t] { col += YYLeng(); }
. { col += YYLeng(); return 4; }
%%