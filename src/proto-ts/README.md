To update aapt2 proto, run
`protoc --plugin=vendor/adevtool/node_modules/.bin/protoc-gen-ts_proto --ts_proto_out vendor/adevtool/src/proto-ts frameworks/base/tools/aapt2/Resources.proto`
To update carrier config related protos, run
`protoc --plugin=vendor/adevtool/node_modules/.bin/protoc-gen-ts_proto --ts_proto_out vendor/adevtool/src/proto-ts tools/carrier_settings/proto/carrier_{settings,list}.proto`
