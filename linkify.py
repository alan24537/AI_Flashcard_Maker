import hashlib
import io
import os
import os.path
import stat
import tarfile

def _main() -> None:
    for root, _, filenames in os.walk('./venv/lib/python3.8/site-packages'):
            for filename in filenames:
                if filename.endswith('.pyc') or root.endswith('.dist-info'):
                    continue
                filepath = os.path.join(root, filename)
                st = os.lstat(filepath)
                if not stat.S_ISREG(st.st_mode):
                    continue
                with open(filepath, 'rb') as f:
                    contents = f.read()
                    hash = hashlib.sha256(contents).hexdigest()
                    poolpath = os.path.join('/home/runner/.cache/pip/pool', hash[0:2], hash[2:4], hash[4:6], hash[6:])
                if not os.path.isfile(poolpath):
                    continue
                print("unlink %s" % filepath)
                os.unlink(filepath)
                print("link -s %s %s", poolpath, filepath)
                os.symlink(poolpath, filepath)

if __name__ == '__main__':
    _main()