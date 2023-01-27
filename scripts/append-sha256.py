#!/usr/bin/env python3
import sys, hashlib, os
pfiles = sys.argv[1]+'/proprietary-files.txt'
if not os.path.exists(pfiles):
    print(pfiles, 'doesnt exist\nmake sure you have followed the instructions below\nhttps://grapheneos.org/build#extracting-vendor-files-for-pixel-devices')
    exit()
lines = []
shalines = []
with open(pfiles, 'r') as f:
    for line in f:
        line = line.partition('#')[0].rstrip()
        # Drop broken lib
        if line == "system_ext/app/com.qualcomm.qti.services.secureui/lib/arm64/libsecureuisvc_jni.so":
            line = ''
        lines.append(line)
for i in range(len(lines)):
    if lines[i] != '':
        blob = sys.argv[1]+'/proprietary/'+lines[i]
        if "PRESIGNED" in blob:
            blob = blob.replace(";PRESIGNED", "")
        with open(blob, "rb") as f:
            bytes = f.read()
            rhash = hashlib.sha256(bytes).hexdigest()
        shalines.append(lines[i]+":SHA256:"+rhash)
        
with open(pfiles+'.sha256', 'w') as f:
    for line in shalines:
        f.write(line+'\n')
