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
            "cppsrc/main.cc"
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
            }
        ]
    }]
}
