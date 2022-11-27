#include <FlexLexer.h>
#include "kudoaLexer.hh"
#include "myxobolangLexer.hh"
#include "ceratomyxaLexer.hh"

using namespace Napi;

Object initMain(Env env, Object exports)
{
    Object temp;
    temp = Object::New(env);
    kudoaLexer::init(env, temp);
    exports.Set("kudoaLexer", temp);
    temp = Object::New(env);
    myxobolangLexer::init(env, temp);
    exports.Set("myxobolangLexer", temp);
    temp = Object::New(env);
    ceratomyxaLexer::init(env, temp);
    exports.Set("ceratomyxaLexer", temp);
    return exports;
}

NODE_API_MODULE(NODE_GYP_MODULE_NAME, initMain)