{
    "targets": [{
        "target_name": "lexer",
        "cflags!": ["-fno-exceptions"],
        "cflags_cc!": ["-fno-exceptions"],
        "sources": [
            "cppsrc/kudoaLexer.cc",
            "cppbuild/kudoa.lex.yy.cc",
            "cppsrc/myxobolangLexer.cc",
            "cppbuild/myxobolang.lex.yy.cc",
            "cppsrc/main.cc",
            "cppbuild/useless.lex.yy.cc",
            "cppsrc/ceratomyxaLexer.cc",
            "cppbuild/ceratomyxa.lex.yy.cc",
            "cppsrc/dicaudaLexer.cc",
            "cppbuild/dicauda.lex.yy.cc"
        ],
        "include_dirs": [
            "<!@(node -p \"require('node-addon-api').include\")",
            "cppsrc"
        ],
        "libraries": [],
        "dependencies": [
            "<!(node -p \"require('node-addon-api').gyp\")"
        ],
        "defines": ["NAPI_DISABLE_CPP_EXCEPTIONS"],
        "actions": [
            {
                "action_name": "flex_kudoa",
                "inputs": ["cppsrc/kudoaLexer.l"],
                "outputs": ["cppbuild/kudoa.lex.yy.cc"],
                "action": ["flex", "-+", "-o", "<@(_outputs)", "<@(_inputs)"]
            },
            {
                "action_name": "flex_myxobolang",
                "inputs": ["cppsrc/myxobolangLexer.l"],
                "outputs": ["cppbuild/myxobolang.lex.yy.cc"],
                "action": ["flex", "-+", "-o", "<@(_outputs)", "<@(_inputs)"]
            },
            {
                "action_name": "flex_useless",
                "inputs": ["cppsrc/useless.l"],
                "outputs": ["cppbuild/useless.lex.yy.cc"],
                "action": ["flex", "-+", "-o", "<@(_outputs)", "<@(_inputs)"]
            },
            {
                "action_name": "flex_ceratomyxa",
                "inputs": ["cppsrc/ceratomyxaLexer.l"],
                "outputs": ["cppbuild/ceratomyxa.lex.yy.cc"],
                "action": ["flex", "-+", "-o", "<@(_outputs)", "<@(_inputs)"]
            },
            {
                "action_name": "flex_dicauda",
                "inputs": ["cppsrc/dicaudaLexer.l"],
                "outputs": ["cppbuild/dicauda.lex.yy.cc"],
                "action": ["flex", "-+", "-o", "<@(_outputs)", "<@(_inputs)"]
            }
        ]
    }]
}
