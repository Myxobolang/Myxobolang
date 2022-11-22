import os
import re

a = os.listdir('src')

print(a)

to_remove = re.compile(r'.*(.d.ts)|(.map)|(.js)$')


def rmAll(root: str):
    dirs = os.listdir(root)
    for i in dirs:
        result = os.path.isdir(f'{root}/{i}')
        if result:
            rmAll(f'{root}/{i}')
        else:
            os.remove(f'{root}/{i}')


rmAll('src')
