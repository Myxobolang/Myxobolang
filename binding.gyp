{
    "targets": [{
        "target_name": "lexer",
        "cflags!": ["-fno-exceptions"],
        "cflags_cc!": ["-fno-exceptions"],
        "sources": [
            "cppsrc/lexer.cc",
            "cppbuild/lex.yy.cc"
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
        "actions": [{
            "action_name": "flex",
            "inputs": ["cppsrc/lexer.l"],
            "outputs": ["cppbuild/lex.yy.cc"],
            "action": ["flex", "-+", "-o", "<@(_outputs)", "<@(_inputs)"]
        }]
    }]
}
