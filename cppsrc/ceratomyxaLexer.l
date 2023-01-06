%{
#include "ceratomyxaLexer.hh"
%}

%option noyywrap
%option c++
%option yyclass="CeratomyxaLexer"
%option prefix="cr"

Base64 [A-Za-z0-9\+/]

%%
var { col += YYLeng(); return 1; }
val { col += YYLeng(); return 2; }
function { col += YYLeng(); return 3; }
return { col += YYLeng(); return 4; }
if { col += YYLeng(); return 5; }
else { col += YYLeng(); return 6; }
while { col += YYLeng(); return 7; }
break { col += YYLeng(); return 8; }
int { col += YYLeng(); return 9; }
float { col += YYLeng(); return 10; }
char { col += YYLeng(); return 11; }
\{ { col += YYLeng(); return 12; }
\} { col += YYLeng(); return 13; }
\( { col += YYLeng(); return 14; }
\) { col += YYLeng(); return 15; }
i_[0-9]+ { col += YYLeng(); return 16; }
f_[0-9]+\.[0-9]+ { col += YYLeng(); return 17; }
= { col += YYLeng(); return 18; }
v_({Base64}|_)* { col += YYLeng(); return 19; }
mo[0-9]+_({Base64}|_)* { col += YYLeng(); return 20; }
do[0-9]+_({Base64}|_)* { col += YYLeng(); return 21; }
; { col += YYLeng(); return 22; }
, { col += YYLeng(); return 23; }
void { col += YYLeng(); return 24; }
array { col += YYLeng(); return 25; }

#[^\n]* { col += YYLeng(); }
\n { col = 0; row++; }
[\x20\t] { col += YYLeng(); }
. { col += YYLeng(); return -1; }
%%