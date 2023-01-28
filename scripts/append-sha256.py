#!/usr/bin/env python3
import sys, hashlib, os
pfiles = sys.argv[1]+'/proprietary-files.txt'
mkfile = sys.argv[1]+'/Android.mk'
if not os.path.exists(pfiles):
    print(pfiles, 'doesnt exist\nmake sure you have followed the instructions below\nhttps://grapheneos.org/build#extracting-vendor-files-for-pixel-devices')
    exit()
plines = []
mklines = []
shalines = []
with open(mkfile, 'r') as f:
    for line in f:
        if line.startswith("    ln -sf"):
            line = line.replace(";", "")
            line = line.replace("\\", "")
            line = line.replace("$(PRODUCT_OUT)/", "")
            arrline = line.split()
            mklines.append(arrline[3]) 
with open(pfiles, 'r') as f:
    for line in f:
        line = line.partition('#')[0].rstrip()
        if line in mklines:
            continue
        plines.append(line)
for i in range(len(plines)):
    if plines[i] != '':
        blob = sys.argv[1]+'/proprietary/'+plines[i]
        if "PRESIGNED" in blob:
            blob = blob.replace(";PRESIGNED", "")
        with open(blob, "rb") as f:
            bytes = f.read()
            rhash = hashlib.sha256(bytes).hexdigest()
        shalines.append(plines[i]+":SHA256:"+rhash)
        
with open(pfiles+'.sha256', 'w') as f:
    for line in shalines:
        f.write(line+'\n')
