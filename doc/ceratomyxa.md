# Ceratomyxa

**Ceratomyxa**是**Myxobolang**经过预处理后产生的语言，消灭了命名空间，并区分了宏和普通变量。

## 标识符

Ceratomyxa的标识符只能由Base64编码中可用的字符以及下划线（`_`）组成。

标识符分为关键字、宏和变量。

### 关键字

Ceratomyxa只有三个关键字：`macro`，`as`和`endm`。

### 宏

Ceratomyxa的宏必须以`m_`开头。

### 变量

Ceratomyxa的变量必须以`v_`开头。
