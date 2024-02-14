/* eslint-disable */
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "com.google.wireless.android.nexus.carrier";

export interface CarrierSettingsConfig {
  config: { [key: string]: string };
}

export interface CarrierSettingsConfig_ConfigEntry {
  key: string;
  value: string;
}

function createBaseCarrierSettingsConfig(): CarrierSettingsConfig {
  return { config: {} };
}

export const CarrierSettingsConfig = {
  encode(message: CarrierSettingsConfig, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    Object.entries(message.config).forEach(([key, value]) => {
      CarrierSettingsConfig_ConfigEntry.encode({ key: key as any, value }, writer.uint32(10).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CarrierSettingsConfig {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCarrierSettingsConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          const entry1 = CarrierSettingsConfig_ConfigEntry.decode(reader, reader.uint32());
          if (entry1.value !== undefined) {
            message.config[entry1.key] = entry1.value;
          }
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CarrierSettingsConfig {
    return {
      config: isObject(object.config)
        ? Object.entries(object.config).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: CarrierSettingsConfig): unknown {
    const obj: any = {};
    if (message.config) {
      const entries = Object.entries(message.config);
      if (entries.length > 0) {
        obj.config = {};
        entries.forEach(([k, v]) => {
          obj.config[k] = v;
        });
      }
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CarrierSettingsConfig>, I>>(base?: I): CarrierSettingsConfig {
    return CarrierSettingsConfig.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CarrierSettingsConfig>, I>>(object: I): CarrierSettingsConfig {
    const message = createBaseCarrierSettingsConfig();
    message.config = Object.entries(object.config ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = String(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseCarrierSettingsConfig_ConfigEntry(): CarrierSettingsConfig_ConfigEntry {
  return { key: "", value: "" };
}

export const CarrierSettingsConfig_ConfigEntry = {
  encode(message: CarrierSettingsConfig_ConfigEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CarrierSettingsConfig_ConfigEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCarrierSettingsConfig_ConfigEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CarrierSettingsConfig_ConfigEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: CarrierSettingsConfig_ConfigEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== "") {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CarrierSettingsConfig_ConfigEntry>, I>>(
    base?: I,
  ): CarrierSettingsConfig_ConfigEntry {
    return CarrierSettingsConfig_ConfigEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CarrierSettingsConfig_ConfigEntry>, I>>(
    object: I,
  ): CarrierSettingsConfig_ConfigEntry {
    const message = createBaseCarrierSettingsConfig_ConfigEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
