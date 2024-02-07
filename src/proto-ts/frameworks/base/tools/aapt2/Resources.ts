/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import { Configuration } from "./Configuration";
import Long = require("long");

export const protobufPackage = "aapt.pb";

/** A string pool that wraps the binary form of the C++ class android::ResStringPool. */
export interface StringPool {
  data: Uint8Array;
}

/** The position of a declared entity within a file. */
export interface SourcePosition {
  lineNumber: number;
  columnNumber: number;
}

/** Developer friendly source file information for an entity in the resource table. */
export interface Source {
  /** The index of the string path within the source string pool of a ResourceTable. */
  pathIdx: number;
  position: SourcePosition | undefined;
}

/** The name and version fingerprint of a build tool. */
export interface ToolFingerprint {
  tool: string;
  version: string;
}

/** References to non local resources */
export interface DynamicRefTable {
  packageId: PackageId | undefined;
  packageName: string;
}

/** Top level message representing a resource table. */
export interface ResourceTable {
  /**
   * The string pool containing source paths referenced throughout the resource table. This does
   * not end up in the final binary ARSC file.
   */
  sourcePool:
    | StringPool
    | undefined;
  /** Resource definitions corresponding to an Android package. */
  package: Package[];
  /** The <overlayable> declarations within the resource table. */
  overlayable: Overlayable[];
  /** The version fingerprints of the tools that built the resource table. */
  toolFingerprint: ToolFingerprint[];
  dynamicRefTable: DynamicRefTable[];
}

/** A package ID in the range [0x00, 0xff]. */
export interface PackageId {
  id: number;
}

/** Defines resources for an Android package. */
export interface Package {
  /**
   * The package ID of this package, in the range [0x00, 0xff].
   * - ID 0x00 is reserved for shared libraries, or when the ID is assigned at run-time.
   * - ID 0x01 is reserved for the 'android' package (framework).
   * - ID range [0x02, 0x7f) is reserved for auto-assignment to shared libraries at run-time.
   * - ID 0x7f is reserved for the application package.
   * - IDs > 0x7f are reserved for the application as well and are treated as feature splits.
   * This may not be set if no ID was assigned.
   */
  packageId:
    | PackageId
    | undefined;
  /** The Java compatible Android package name of the app. */
  packageName: string;
  /** The series of types defined by the package. */
  type: Type[];
}

/** A type ID in the range [0x01, 0xff]. */
export interface TypeId {
  id: number;
}

/**
 * A set of resources grouped under a common type. Such types include string, layout, xml, dimen,
 * attr, etc. This maps to the second part of a resource identifier in Java (R.type.entry).
 */
export interface Type {
  /** The ID of the type. This may not be set if no ID was assigned. */
  typeId:
    | TypeId
    | undefined;
  /**
   * The name of the type. This corresponds to the 'type' part of a full resource name of the form
   * package:type/entry. The set of legal type names is listed in Resource.cpp.
   */
  name: string;
  /** The entries defined for this type. */
  entry: Entry[];
}

/** The Visibility of a symbol/entry (public, private, undefined). */
export interface Visibility {
  level: Visibility_Level;
  /** The path at which this entry's visibility was defined (eg. public.xml). */
  source:
    | Source
    | undefined;
  /** The comment associated with the <public> tag. */
  comment: string;
  /**
   * Indicates that the resource id may change across builds and that the public R.java identifier
   * for this resource should not be final. This is set to `true` for resources in `staging-group`
   * tags.
   */
  stagedApi: boolean;
}

/** The visibility of the resource outside of its package. */
export enum Visibility_Level {
  /**
   * UNKNOWN - No visibility was explicitly specified. This is typically treated as private.
   * The distinction is important when two separate R.java files are generated: a public and
   * private one. An unknown visibility, in this case, would cause the resource to be omitted
   * from either R.java.
   */
  UNKNOWN = 0,
  /**
   * PRIVATE - A resource was explicitly marked as private. This means the resource can not be accessed
   * outside of its package unless the @*package:type/entry notation is used (the asterisk being
   * the private accessor). If two R.java files are generated (private + public), the resource
   * will only be emitted to the private R.java file.
   */
  PRIVATE = 1,
  /**
   * PUBLIC - A resource was explicitly marked as public. This means the resource can be accessed
   * from any package, and is emitted into all R.java files, public and private.
   */
  PUBLIC = 2,
  UNRECOGNIZED = -1,
}

export function visibility_LevelFromJSON(object: any): Visibility_Level {
  switch (object) {
    case 0:
    case "UNKNOWN":
      return Visibility_Level.UNKNOWN;
    case 1:
    case "PRIVATE":
      return Visibility_Level.PRIVATE;
    case 2:
    case "PUBLIC":
      return Visibility_Level.PUBLIC;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Visibility_Level.UNRECOGNIZED;
  }
}

export function visibility_LevelToJSON(object: Visibility_Level): string {
  switch (object) {
    case Visibility_Level.UNKNOWN:
      return "UNKNOWN";
    case Visibility_Level.PRIVATE:
      return "PRIVATE";
    case Visibility_Level.PUBLIC:
      return "PUBLIC";
    case Visibility_Level.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * Whether a resource comes from a compile-time overlay and is explicitly allowed to not overlay an
 * existing resource.
 */
export interface AllowNew {
  /** Where this was defined in source. */
  source:
    | Source
    | undefined;
  /** Any comment associated with the declaration. */
  comment: string;
}

/** Represents a set of overlayable resources. */
export interface Overlayable {
  /** The name of the <overlayable>. */
  name: string;
  /** The location of the <overlayable> declaration in the source. */
  source:
    | Source
    | undefined;
  /** The component responsible for enabling and disabling overlays targeting this <overlayable>. */
  actor: string;
}

/** Represents an overlayable <item> declaration within an <overlayable> tag. */
export interface OverlayableItem {
  /** The location of the <item> declaration in source. */
  source:
    | Source
    | undefined;
  /** Any comment associated with the declaration. */
  comment: string;
  /** The policy defined by the enclosing <policy> tag of this <item>. */
  policy: OverlayableItem_Policy[];
  /**
   * The index into overlayable list that points to the <overlayable> tag that contains
   * this <item>.
   */
  overlayableIdx: number;
}

export enum OverlayableItem_Policy {
  NONE = 0,
  PUBLIC = 1,
  SYSTEM = 2,
  VENDOR = 3,
  PRODUCT = 4,
  SIGNATURE = 5,
  ODM = 6,
  OEM = 7,
  ACTOR = 8,
  CONFIG_SIGNATURE = 9,
  UNRECOGNIZED = -1,
}

export function overlayableItem_PolicyFromJSON(object: any): OverlayableItem_Policy {
  switch (object) {
    case 0:
    case "NONE":
      return OverlayableItem_Policy.NONE;
    case 1:
    case "PUBLIC":
      return OverlayableItem_Policy.PUBLIC;
    case 2:
    case "SYSTEM":
      return OverlayableItem_Policy.SYSTEM;
    case 3:
    case "VENDOR":
      return OverlayableItem_Policy.VENDOR;
    case 4:
    case "PRODUCT":
      return OverlayableItem_Policy.PRODUCT;
    case 5:
    case "SIGNATURE":
      return OverlayableItem_Policy.SIGNATURE;
    case 6:
    case "ODM":
      return OverlayableItem_Policy.ODM;
    case 7:
    case "OEM":
      return OverlayableItem_Policy.OEM;
    case 8:
    case "ACTOR":
      return OverlayableItem_Policy.ACTOR;
    case 9:
    case "CONFIG_SIGNATURE":
      return OverlayableItem_Policy.CONFIG_SIGNATURE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return OverlayableItem_Policy.UNRECOGNIZED;
  }
}

export function overlayableItem_PolicyToJSON(object: OverlayableItem_Policy): string {
  switch (object) {
    case OverlayableItem_Policy.NONE:
      return "NONE";
    case OverlayableItem_Policy.PUBLIC:
      return "PUBLIC";
    case OverlayableItem_Policy.SYSTEM:
      return "SYSTEM";
    case OverlayableItem_Policy.VENDOR:
      return "VENDOR";
    case OverlayableItem_Policy.PRODUCT:
      return "PRODUCT";
    case OverlayableItem_Policy.SIGNATURE:
      return "SIGNATURE";
    case OverlayableItem_Policy.ODM:
      return "ODM";
    case OverlayableItem_Policy.OEM:
      return "OEM";
    case OverlayableItem_Policy.ACTOR:
      return "ACTOR";
    case OverlayableItem_Policy.CONFIG_SIGNATURE:
      return "CONFIG_SIGNATURE";
    case OverlayableItem_Policy.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** The staged resource ID definition of a finalized resource. */
export interface StagedId {
  source: Source | undefined;
  stagedId: number;
}

/** An entry ID in the range [0x0000, 0xffff]. */
export interface EntryId {
  id: number;
}

/**
 * An entry declaration. An entry has a full resource ID that is the combination of package ID,
 * type ID, and its own entry ID. An entry on its own has no value, but values are defined for
 * various configurations/variants.
 */
export interface Entry {
  /**
   * The ID of this entry. Together with the package ID and type ID, this forms a full resource ID
   * of the form 0xPPTTEEEE, where PP is the package ID, TT is the type ID, and EEEE is the entry
   * ID.
   * This may not be set if no ID was assigned.
   */
  entryId:
    | EntryId
    | undefined;
  /**
   * The name of this entry. This corresponds to the 'entry' part of a full resource name of the
   * form package:type/entry.
   */
  name: string;
  /** The visibility of this entry (public, private, undefined). */
  visibility:
    | Visibility
    | undefined;
  /**
   * Whether this resource, when originating from a compile-time overlay, is allowed to NOT overlay
   * any existing resources.
   */
  allowNew:
    | AllowNew
    | undefined;
  /** Whether this resource can be overlaid by a runtime resource overlay (RRO). */
  overlayableItem:
    | OverlayableItem
    | undefined;
  /**
   * The set of values defined for this entry, each corresponding to a different
   * configuration/variant.
   */
  configValue: ConfigValue[];
  /** The staged resource ID of this finalized resource. */
  stagedId: StagedId | undefined;
}

/** A Configuration/Value pair. */
export interface ConfigValue {
  config: Configuration | undefined;
  value: Value | undefined;
}

/** The generic meta-data for every value in a resource table. */
export interface Value {
  /** Where the value was defined. */
  source:
    | Source
    | undefined;
  /** Any comment associated with the value. */
  comment: string;
  /** Whether the value can be overridden. */
  weak: boolean;
  item?: Item | undefined;
  compoundValue?: CompoundValue | undefined;
}

/**
 * An Item is an abstract type. It represents a value that can appear inline in many places, such
 * as XML attribute values or on the right hand side of style attribute definitions. The concrete
 * type is one of the types below. Only one can be set.
 */
export interface Item {
  ref?: Reference | undefined;
  str?: String | undefined;
  rawStr?: RawString | undefined;
  styledStr?: StyledString | undefined;
  file?: FileReference | undefined;
  id?: Id | undefined;
  prim?: Primitive | undefined;
}

/**
 * A CompoundValue is an abstract type. It represents a value that is a made of other values.
 * These can only usually appear as top-level resources. The concrete type is one of the types
 * below. Only one can be set.
 */
export interface CompoundValue {
  attr?: Attribute | undefined;
  style?: Style | undefined;
  styleable?: Styleable | undefined;
  array?: Array | undefined;
  plural?: Plural | undefined;
  macro?: MacroBody | undefined;
}

/** Message holding a boolean, so it can be optionally encoded. */
export interface Boolean {
  value: boolean;
}

/** A value that is a reference to another resource. This reference can be by name or resource ID. */
export interface Reference {
  type: Reference_Type;
  /** The resource ID (0xPPTTEEEE) of the resource being referred. This is optional. */
  id: number;
  /** The name of the resource being referred. This is optional if the resource ID is set. */
  name: string;
  /** Whether this reference is referencing a private resource (@*package:type/entry). */
  private: boolean;
  /** Whether this reference is dynamic. */
  isDynamic:
    | Boolean
    | undefined;
  /** The type flags used when compiling the reference. Used for substituting the contents of macros. */
  typeFlags: number;
  /**
   * Whether raw string values would have been accepted in place of this reference definition. Used
   * for substituting the contents of macros.
   */
  allowRaw: boolean;
}

export enum Reference_Type {
  /** REFERENCE - A plain reference (@package:type/entry). */
  REFERENCE = 0,
  /** ATTRIBUTE - A reference to a theme attribute (?package:type/entry). */
  ATTRIBUTE = 1,
  UNRECOGNIZED = -1,
}

export function reference_TypeFromJSON(object: any): Reference_Type {
  switch (object) {
    case 0:
    case "REFERENCE":
      return Reference_Type.REFERENCE;
    case 1:
    case "ATTRIBUTE":
      return Reference_Type.ATTRIBUTE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Reference_Type.UNRECOGNIZED;
  }
}

export function reference_TypeToJSON(object: Reference_Type): string {
  switch (object) {
    case Reference_Type.REFERENCE:
      return "REFERENCE";
    case Reference_Type.ATTRIBUTE:
      return "ATTRIBUTE";
    case Reference_Type.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * A value that represents an ID. This is just a placeholder, as ID values are used to occupy a
 * resource ID (0xPPTTEEEE) as a unique identifier. Their value is unimportant.
 */
export interface Id {
}

/** A value that is a string. */
export interface String {
  value: string;
}

/**
 * A value that is a raw string, which is unescaped/uninterpreted. This is typically used to
 * represent the value of a style attribute before the attribute is compiled and the set of
 * allowed values is known.
 */
export interface RawString {
  value: string;
}

/** A string with styling information, like html tags that specify boldness, italics, etc. */
export interface StyledString {
  /** The raw text of the string. */
  value: string;
  span: StyledString_Span[];
}

/** A Span marks a region of the string text that is styled. */
export interface StyledString_Span {
  /**
   * The name of the tag, and its attributes, encoded as follows:
   * tag_name;attr1=value1;attr2=value2;[...]
   */
  tag: string;
  /** The first character position this span applies to, in UTF-16 offset. */
  firstChar: number;
  /** The last character position this span applies to, in UTF-16 offset. */
  lastChar: number;
}

/** A value that is a reference to an external entity, like an XML file or a PNG. */
export interface FileReference {
  /** Path to a file within the APK (typically res/type-config/entry.ext). */
  path: string;
  /**
   * The type of file this path points to. For UAM bundle, this cannot be
   * BINARY_XML.
   */
  type: FileReference_Type;
}

export enum FileReference_Type {
  UNKNOWN = 0,
  PNG = 1,
  BINARY_XML = 2,
  PROTO_XML = 3,
  UNRECOGNIZED = -1,
}

export function fileReference_TypeFromJSON(object: any): FileReference_Type {
  switch (object) {
    case 0:
    case "UNKNOWN":
      return FileReference_Type.UNKNOWN;
    case 1:
    case "PNG":
      return FileReference_Type.PNG;
    case 2:
    case "BINARY_XML":
      return FileReference_Type.BINARY_XML;
    case 3:
    case "PROTO_XML":
      return FileReference_Type.PROTO_XML;
    case -1:
    case "UNRECOGNIZED":
    default:
      return FileReference_Type.UNRECOGNIZED;
  }
}

export function fileReference_TypeToJSON(object: FileReference_Type): string {
  switch (object) {
    case FileReference_Type.UNKNOWN:
      return "UNKNOWN";
    case FileReference_Type.PNG:
      return "PNG";
    case FileReference_Type.BINARY_XML:
      return "BINARY_XML";
    case FileReference_Type.PROTO_XML:
      return "PROTO_XML";
    case FileReference_Type.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * A value that represents a primitive data type (float, int, boolean, etc.).
 * Refer to Res_value in ResourceTypes.h for info on types and formatting
 */
export interface Primitive {
  nullValue?: Primitive_NullType | undefined;
  emptyValue?: Primitive_EmptyType | undefined;
  floatValue?: number | undefined;
  dimensionValue?: number | undefined;
  fractionValue?: number | undefined;
  intDecimalValue?: number | undefined;
  intHexadecimalValue?: number | undefined;
  booleanValue?: boolean | undefined;
  colorArgb8Value?: number | undefined;
  colorRgb8Value?: number | undefined;
  colorArgb4Value?: number | undefined;
  colorRgb4Value?:
    | number
    | undefined;
  /** @deprecated */
  dimensionValueDeprecated?:
    | number
    | undefined;
  /** @deprecated */
  fractionValueDeprecated?: number | undefined;
}

export interface Primitive_NullType {
}

export interface Primitive_EmptyType {
}

/** A value that represents an XML attribute and what values it accepts. */
export interface Attribute {
  /**
   * A bitmask of types that this XML attribute accepts. Corresponds to the flags in the
   * enum FormatFlags.
   */
  formatFlags: number;
  /**
   * The smallest integer allowed for this XML attribute. Only makes sense if the format includes
   * FormatFlags::INTEGER.
   */
  minInt: number;
  /**
   * The largest integer allowed for this XML attribute. Only makes sense if the format includes
   * FormatFlags::INTEGER.
   */
  maxInt: number;
  /**
   * The set of enums/flags defined in this attribute. Only makes sense if the format includes
   * either FormatFlags::ENUM or FormatFlags::FLAGS. Having both is an error.
   */
  symbol: Attribute_Symbol[];
}

/** Bitmask of formats allowed for an attribute. */
export enum Attribute_FormatFlags {
  /** NONE - Proto3 requires a default of 0. */
  NONE = 0,
  /** ANY - Allows any type except ENUM and FLAGS. */
  ANY = 65535,
  /** REFERENCE - Allows Reference values. */
  REFERENCE = 1,
  /** STRING - Allows String/StyledString values. */
  STRING = 2,
  /** INTEGER - Allows any integer BinaryPrimitive values. */
  INTEGER = 4,
  /** BOOLEAN - Allows any boolean BinaryPrimitive values. */
  BOOLEAN = 8,
  /** COLOR - Allows any color BinaryPrimitive values. */
  COLOR = 16,
  /** FLOAT - Allows any float BinaryPrimitive values. */
  FLOAT = 32,
  /** DIMENSION - Allows any dimension BinaryPrimitive values. */
  DIMENSION = 64,
  /** FRACTION - Allows any fraction BinaryPrimitive values. */
  FRACTION = 128,
  /** ENUM - Allows enums that are defined in the Attribute's symbols. */
  ENUM = 65536,
  /** FLAGS - ENUM and FLAGS cannot BOTH be set. */
  FLAGS = 131072,
  UNRECOGNIZED = -1,
}

export function attribute_FormatFlagsFromJSON(object: any): Attribute_FormatFlags {
  switch (object) {
    case 0:
    case "NONE":
      return Attribute_FormatFlags.NONE;
    case 65535:
    case "ANY":
      return Attribute_FormatFlags.ANY;
    case 1:
    case "REFERENCE":
      return Attribute_FormatFlags.REFERENCE;
    case 2:
    case "STRING":
      return Attribute_FormatFlags.STRING;
    case 4:
    case "INTEGER":
      return Attribute_FormatFlags.INTEGER;
    case 8:
    case "BOOLEAN":
      return Attribute_FormatFlags.BOOLEAN;
    case 16:
    case "COLOR":
      return Attribute_FormatFlags.COLOR;
    case 32:
    case "FLOAT":
      return Attribute_FormatFlags.FLOAT;
    case 64:
    case "DIMENSION":
      return Attribute_FormatFlags.DIMENSION;
    case 128:
    case "FRACTION":
      return Attribute_FormatFlags.FRACTION;
    case 65536:
    case "ENUM":
      return Attribute_FormatFlags.ENUM;
    case 131072:
    case "FLAGS":
      return Attribute_FormatFlags.FLAGS;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Attribute_FormatFlags.UNRECOGNIZED;
  }
}

export function attribute_FormatFlagsToJSON(object: Attribute_FormatFlags): string {
  switch (object) {
    case Attribute_FormatFlags.NONE:
      return "NONE";
    case Attribute_FormatFlags.ANY:
      return "ANY";
    case Attribute_FormatFlags.REFERENCE:
      return "REFERENCE";
    case Attribute_FormatFlags.STRING:
      return "STRING";
    case Attribute_FormatFlags.INTEGER:
      return "INTEGER";
    case Attribute_FormatFlags.BOOLEAN:
      return "BOOLEAN";
    case Attribute_FormatFlags.COLOR:
      return "COLOR";
    case Attribute_FormatFlags.FLOAT:
      return "FLOAT";
    case Attribute_FormatFlags.DIMENSION:
      return "DIMENSION";
    case Attribute_FormatFlags.FRACTION:
      return "FRACTION";
    case Attribute_FormatFlags.ENUM:
      return "ENUM";
    case Attribute_FormatFlags.FLAGS:
      return "FLAGS";
    case Attribute_FormatFlags.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** A Symbol used to represent an enum or a flag. */
export interface Attribute_Symbol {
  /** Where the enum/flag item was defined. */
  source:
    | Source
    | undefined;
  /** Any comments associated with the enum or flag. */
  comment: string;
  /**
   * The name of the enum/flag as a reference. Enums/flag items are generated as ID resource
   * values.
   */
  name:
    | Reference
    | undefined;
  /** The value of the enum/flag. */
  value: number;
  /** The data type of the enum/flag as defined in android::Res_value. */
  type: number;
}

/** A value that represents a style. */
export interface Style {
  /** The optinal style from which this style inherits attributes. */
  parent:
    | Reference
    | undefined;
  /** The source file information of the parent inheritance declaration. */
  parentSource:
    | Source
    | undefined;
  /** The set of XML attribute/value pairs for this style. */
  entry: Style_Entry[];
}

/** An XML attribute/value pair defined in the style. */
export interface Style_Entry {
  /** Where the entry was defined. */
  source:
    | Source
    | undefined;
  /** Any comments associated with the entry. */
  comment: string;
  /** A reference to the XML attribute. */
  key:
    | Reference
    | undefined;
  /** The Item defined for this XML attribute. */
  item: Item | undefined;
}

/**
 * A value that represents a <declare-styleable> XML resource. These are not real resources and
 * only end up as Java fields in the generated R.java. They do not end up in the binary ARSC file.
 */
export interface Styleable {
  /** The set of attribute declarations. */
  entry: Styleable_Entry[];
}

/** An attribute defined for this styleable. */
export interface Styleable_Entry {
  /** Where the attribute was defined within the <declare-styleable> block. */
  source:
    | Source
    | undefined;
  /** Any comments associated with the declaration. */
  comment: string;
  /** The reference to the attribute. */
  attr: Reference | undefined;
}

/** A value that represents an array of resource values. */
export interface Array {
  /** The list of array elements. */
  element: Array_Element[];
}

/** A single element of the array. */
export interface Array_Element {
  /** Where the element was defined. */
  source:
    | Source
    | undefined;
  /** Any comments associated with the element. */
  comment: string;
  /** The value assigned to this element. */
  item: Item | undefined;
}

/** A value that represents a string and its many variations based on plurality. */
export interface Plural {
  /** The set of arity/plural mappings. */
  entry: Plural_Entry[];
}

/** The arity of the plural. */
export enum Plural_Arity {
  ZERO = 0,
  ONE = 1,
  TWO = 2,
  FEW = 3,
  MANY = 4,
  OTHER = 5,
  UNRECOGNIZED = -1,
}

export function plural_ArityFromJSON(object: any): Plural_Arity {
  switch (object) {
    case 0:
    case "ZERO":
      return Plural_Arity.ZERO;
    case 1:
    case "ONE":
      return Plural_Arity.ONE;
    case 2:
    case "TWO":
      return Plural_Arity.TWO;
    case 3:
    case "FEW":
      return Plural_Arity.FEW;
    case 4:
    case "MANY":
      return Plural_Arity.MANY;
    case 5:
    case "OTHER":
      return Plural_Arity.OTHER;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Plural_Arity.UNRECOGNIZED;
  }
}

export function plural_ArityToJSON(object: Plural_Arity): string {
  switch (object) {
    case Plural_Arity.ZERO:
      return "ZERO";
    case Plural_Arity.ONE:
      return "ONE";
    case Plural_Arity.TWO:
      return "TWO";
    case Plural_Arity.FEW:
      return "FEW";
    case Plural_Arity.MANY:
      return "MANY";
    case Plural_Arity.OTHER:
      return "OTHER";
    case Plural_Arity.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** The plural value for a given arity. */
export interface Plural_Entry {
  /** Where the plural was defined. */
  source:
    | Source
    | undefined;
  /** Any comments associated with the plural. */
  comment: string;
  /** The arity of the plural. */
  arity: Plural_Arity;
  /** The value assigned to this plural. */
  item: Item | undefined;
}

/**
 * Defines an abstract XmlNode that must be either an XmlElement, or
 * a text node represented by a string.
 */
export interface XmlNode {
  element?: XmlElement | undefined;
  text?:
    | string
    | undefined;
  /** Source line and column info. */
  source: SourcePosition | undefined;
}

/** An <element> in an XML document. */
export interface XmlElement {
  /** Namespaces defined on this element. */
  namespaceDeclaration: XmlNamespace[];
  /** The namespace URI of this element. */
  namespaceUri: string;
  /** The name of this element. */
  name: string;
  /** The attributes of this element. */
  attribute: XmlAttribute[];
  /** The children of this element. */
  child: XmlNode[];
}

/** A namespace declaration on an XmlElement (xmlns:android="http://..."). */
export interface XmlNamespace {
  prefix: string;
  uri: string;
  /** Source line and column info. */
  source: SourcePosition | undefined;
}

/** An attribute defined on an XmlElement (android:text="..."). */
export interface XmlAttribute {
  namespaceUri: string;
  name: string;
  value: string;
  /** Source line and column info. */
  source:
    | SourcePosition
    | undefined;
  /** The optional resource ID (0xPPTTEEEE) of the attribute. */
  resourceId: number;
  /** The optional interpreted/compiled version of the `value` string. */
  compiledItem: Item | undefined;
}

export interface MacroBody {
  rawString: string;
  styleString: StyleString | undefined;
  untranslatableSections: UntranslatableSection[];
  namespaceStack: NamespaceAlias[];
  source: SourcePosition | undefined;
}

export interface NamespaceAlias {
  prefix: string;
  packageName: string;
  isPrivate: boolean;
}

export interface StyleString {
  str: string;
  spans: StyleString_Span[];
}

export interface StyleString_Span {
  name: string;
  startIndex: number;
  endIndex: number;
}

export interface UntranslatableSection {
  startIndex: number;
  endIndex: number;
}

function createBaseStringPool(): StringPool {
  return { data: new Uint8Array(0) };
}

export const StringPool = {
  encode(message: StringPool, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.data.length !== 0) {
      writer.uint32(10).bytes(message.data);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StringPool {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStringPool();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.data = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StringPool {
    return { data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(0) };
  },

  toJSON(message: StringPool): unknown {
    const obj: any = {};
    if (message.data.length !== 0) {
      obj.data = base64FromBytes(message.data);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StringPool>, I>>(base?: I): StringPool {
    return StringPool.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<StringPool>, I>>(object: I): StringPool {
    const message = createBaseStringPool();
    message.data = object.data ?? new Uint8Array(0);
    return message;
  },
};

function createBaseSourcePosition(): SourcePosition {
  return { lineNumber: 0, columnNumber: 0 };
}

export const SourcePosition = {
  encode(message: SourcePosition, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.lineNumber !== 0) {
      writer.uint32(8).uint32(message.lineNumber);
    }
    if (message.columnNumber !== 0) {
      writer.uint32(16).uint32(message.columnNumber);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SourcePosition {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSourcePosition();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.lineNumber = reader.uint32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.columnNumber = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SourcePosition {
    return {
      lineNumber: isSet(object.lineNumber) ? Number(object.lineNumber) : 0,
      columnNumber: isSet(object.columnNumber) ? Number(object.columnNumber) : 0,
    };
  },

  toJSON(message: SourcePosition): unknown {
    const obj: any = {};
    if (message.lineNumber !== 0) {
      obj.lineNumber = Math.round(message.lineNumber);
    }
    if (message.columnNumber !== 0) {
      obj.columnNumber = Math.round(message.columnNumber);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SourcePosition>, I>>(base?: I): SourcePosition {
    return SourcePosition.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SourcePosition>, I>>(object: I): SourcePosition {
    const message = createBaseSourcePosition();
    message.lineNumber = object.lineNumber ?? 0;
    message.columnNumber = object.columnNumber ?? 0;
    return message;
  },
};

function createBaseSource(): Source {
  return { pathIdx: 0, position: undefined };
}

export const Source = {
  encode(message: Source, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pathIdx !== 0) {
      writer.uint32(8).uint32(message.pathIdx);
    }
    if (message.position !== undefined) {
      SourcePosition.encode(message.position, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Source {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSource();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.pathIdx = reader.uint32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.position = SourcePosition.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Source {
    return {
      pathIdx: isSet(object.pathIdx) ? Number(object.pathIdx) : 0,
      position: isSet(object.position) ? SourcePosition.fromJSON(object.position) : undefined,
    };
  },

  toJSON(message: Source): unknown {
    const obj: any = {};
    if (message.pathIdx !== 0) {
      obj.pathIdx = Math.round(message.pathIdx);
    }
    if (message.position !== undefined) {
      obj.position = SourcePosition.toJSON(message.position);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Source>, I>>(base?: I): Source {
    return Source.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Source>, I>>(object: I): Source {
    const message = createBaseSource();
    message.pathIdx = object.pathIdx ?? 0;
    message.position = (object.position !== undefined && object.position !== null)
      ? SourcePosition.fromPartial(object.position)
      : undefined;
    return message;
  },
};

function createBaseToolFingerprint(): ToolFingerprint {
  return { tool: "", version: "" };
}

export const ToolFingerprint = {
  encode(message: ToolFingerprint, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.tool !== "") {
      writer.uint32(10).string(message.tool);
    }
    if (message.version !== "") {
      writer.uint32(18).string(message.version);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ToolFingerprint {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseToolFingerprint();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.tool = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.version = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ToolFingerprint {
    return {
      tool: isSet(object.tool) ? String(object.tool) : "",
      version: isSet(object.version) ? String(object.version) : "",
    };
  },

  toJSON(message: ToolFingerprint): unknown {
    const obj: any = {};
    if (message.tool !== "") {
      obj.tool = message.tool;
    }
    if (message.version !== "") {
      obj.version = message.version;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ToolFingerprint>, I>>(base?: I): ToolFingerprint {
    return ToolFingerprint.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ToolFingerprint>, I>>(object: I): ToolFingerprint {
    const message = createBaseToolFingerprint();
    message.tool = object.tool ?? "";
    message.version = object.version ?? "";
    return message;
  },
};

function createBaseDynamicRefTable(): DynamicRefTable {
  return { packageId: undefined, packageName: "" };
}

export const DynamicRefTable = {
  encode(message: DynamicRefTable, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.packageId !== undefined) {
      PackageId.encode(message.packageId, writer.uint32(10).fork()).ldelim();
    }
    if (message.packageName !== "") {
      writer.uint32(18).string(message.packageName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DynamicRefTable {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDynamicRefTable();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.packageId = PackageId.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.packageName = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DynamicRefTable {
    return {
      packageId: isSet(object.packageId) ? PackageId.fromJSON(object.packageId) : undefined,
      packageName: isSet(object.packageName) ? String(object.packageName) : "",
    };
  },

  toJSON(message: DynamicRefTable): unknown {
    const obj: any = {};
    if (message.packageId !== undefined) {
      obj.packageId = PackageId.toJSON(message.packageId);
    }
    if (message.packageName !== "") {
      obj.packageName = message.packageName;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DynamicRefTable>, I>>(base?: I): DynamicRefTable {
    return DynamicRefTable.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DynamicRefTable>, I>>(object: I): DynamicRefTable {
    const message = createBaseDynamicRefTable();
    message.packageId = (object.packageId !== undefined && object.packageId !== null)
      ? PackageId.fromPartial(object.packageId)
      : undefined;
    message.packageName = object.packageName ?? "";
    return message;
  },
};

function createBaseResourceTable(): ResourceTable {
  return { sourcePool: undefined, package: [], overlayable: [], toolFingerprint: [], dynamicRefTable: [] };
}

export const ResourceTable = {
  encode(message: ResourceTable, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sourcePool !== undefined) {
      StringPool.encode(message.sourcePool, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.package) {
      Package.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.overlayable) {
      Overlayable.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.toolFingerprint) {
      ToolFingerprint.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.dynamicRefTable) {
      DynamicRefTable.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResourceTable {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResourceTable();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sourcePool = StringPool.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.package.push(Package.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.overlayable.push(Overlayable.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.toolFingerprint.push(ToolFingerprint.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.dynamicRefTable.push(DynamicRefTable.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ResourceTable {
    return {
      sourcePool: isSet(object.sourcePool) ? StringPool.fromJSON(object.sourcePool) : undefined,
      package: Array.isArray(object?.package) ? object.package.map((e: any) => Package.fromJSON(e)) : [],
      overlayable: Array.isArray(object?.overlayable)
        ? object.overlayable.map((e: any) => Overlayable.fromJSON(e))
        : [],
      toolFingerprint: Array.isArray(object?.toolFingerprint)
        ? object.toolFingerprint.map((e: any) => ToolFingerprint.fromJSON(e))
        : [],
      dynamicRefTable: Array.isArray(object?.dynamicRefTable)
        ? object.dynamicRefTable.map((e: any) => DynamicRefTable.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ResourceTable): unknown {
    const obj: any = {};
    if (message.sourcePool !== undefined) {
      obj.sourcePool = StringPool.toJSON(message.sourcePool);
    }
    if (message.package?.length) {
      obj.package = message.package.map((e) => Package.toJSON(e));
    }
    if (message.overlayable?.length) {
      obj.overlayable = message.overlayable.map((e) => Overlayable.toJSON(e));
    }
    if (message.toolFingerprint?.length) {
      obj.toolFingerprint = message.toolFingerprint.map((e) => ToolFingerprint.toJSON(e));
    }
    if (message.dynamicRefTable?.length) {
      obj.dynamicRefTable = message.dynamicRefTable.map((e) => DynamicRefTable.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ResourceTable>, I>>(base?: I): ResourceTable {
    return ResourceTable.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ResourceTable>, I>>(object: I): ResourceTable {
    const message = createBaseResourceTable();
    message.sourcePool = (object.sourcePool !== undefined && object.sourcePool !== null)
      ? StringPool.fromPartial(object.sourcePool)
      : undefined;
    message.package = object.package?.map((e) => Package.fromPartial(e)) || [];
    message.overlayable = object.overlayable?.map((e) => Overlayable.fromPartial(e)) || [];
    message.toolFingerprint = object.toolFingerprint?.map((e) => ToolFingerprint.fromPartial(e)) || [];
    message.dynamicRefTable = object.dynamicRefTable?.map((e) => DynamicRefTable.fromPartial(e)) || [];
    return message;
  },
};

function createBasePackageId(): PackageId {
  return { id: 0 };
}

export const PackageId = {
  encode(message: PackageId, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint32(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PackageId {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePackageId();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.id = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PackageId {
    return { id: isSet(object.id) ? Number(object.id) : 0 };
  },

  toJSON(message: PackageId): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PackageId>, I>>(base?: I): PackageId {
    return PackageId.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PackageId>, I>>(object: I): PackageId {
    const message = createBasePackageId();
    message.id = object.id ?? 0;
    return message;
  },
};

function createBasePackage(): Package {
  return { packageId: undefined, packageName: "", type: [] };
}

export const Package = {
  encode(message: Package, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.packageId !== undefined) {
      PackageId.encode(message.packageId, writer.uint32(10).fork()).ldelim();
    }
    if (message.packageName !== "") {
      writer.uint32(18).string(message.packageName);
    }
    for (const v of message.type) {
      Type.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Package {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePackage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.packageId = PackageId.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.packageName = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.type.push(Type.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Package {
    return {
      packageId: isSet(object.packageId) ? PackageId.fromJSON(object.packageId) : undefined,
      packageName: isSet(object.packageName) ? String(object.packageName) : "",
      type: Array.isArray(object?.type) ? object.type.map((e: any) => Type.fromJSON(e)) : [],
    };
  },

  toJSON(message: Package): unknown {
    const obj: any = {};
    if (message.packageId !== undefined) {
      obj.packageId = PackageId.toJSON(message.packageId);
    }
    if (message.packageName !== "") {
      obj.packageName = message.packageName;
    }
    if (message.type?.length) {
      obj.type = message.type.map((e) => Type.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Package>, I>>(base?: I): Package {
    return Package.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Package>, I>>(object: I): Package {
    const message = createBasePackage();
    message.packageId = (object.packageId !== undefined && object.packageId !== null)
      ? PackageId.fromPartial(object.packageId)
      : undefined;
    message.packageName = object.packageName ?? "";
    message.type = object.type?.map((e) => Type.fromPartial(e)) || [];
    return message;
  },
};

function createBaseTypeId(): TypeId {
  return { id: 0 };
}

export const TypeId = {
  encode(message: TypeId, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint32(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TypeId {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTypeId();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.id = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TypeId {
    return { id: isSet(object.id) ? Number(object.id) : 0 };
  },

  toJSON(message: TypeId): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<TypeId>, I>>(base?: I): TypeId {
    return TypeId.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<TypeId>, I>>(object: I): TypeId {
    const message = createBaseTypeId();
    message.id = object.id ?? 0;
    return message;
  },
};

function createBaseType(): Type {
  return { typeId: undefined, name: "", entry: [] };
}

export const Type = {
  encode(message: Type, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.typeId !== undefined) {
      TypeId.encode(message.typeId, writer.uint32(10).fork()).ldelim();
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    for (const v of message.entry) {
      Entry.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Type {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseType();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.typeId = TypeId.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.name = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.entry.push(Entry.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Type {
    return {
      typeId: isSet(object.typeId) ? TypeId.fromJSON(object.typeId) : undefined,
      name: isSet(object.name) ? String(object.name) : "",
      entry: Array.isArray(object?.entry) ? object.entry.map((e: any) => Entry.fromJSON(e)) : [],
    };
  },

  toJSON(message: Type): unknown {
    const obj: any = {};
    if (message.typeId !== undefined) {
      obj.typeId = TypeId.toJSON(message.typeId);
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.entry?.length) {
      obj.entry = message.entry.map((e) => Entry.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Type>, I>>(base?: I): Type {
    return Type.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Type>, I>>(object: I): Type {
    const message = createBaseType();
    message.typeId = (object.typeId !== undefined && object.typeId !== null)
      ? TypeId.fromPartial(object.typeId)
      : undefined;
    message.name = object.name ?? "";
    message.entry = object.entry?.map((e) => Entry.fromPartial(e)) || [];
    return message;
  },
};

function createBaseVisibility(): Visibility {
  return { level: 0, source: undefined, comment: "", stagedApi: false };
}

export const Visibility = {
  encode(message: Visibility, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.level !== 0) {
      writer.uint32(8).int32(message.level);
    }
    if (message.source !== undefined) {
      Source.encode(message.source, writer.uint32(18).fork()).ldelim();
    }
    if (message.comment !== "") {
      writer.uint32(26).string(message.comment);
    }
    if (message.stagedApi === true) {
      writer.uint32(32).bool(message.stagedApi);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Visibility {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVisibility();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.level = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.source = Source.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.comment = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.stagedApi = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Visibility {
    return {
      level: isSet(object.level) ? visibility_LevelFromJSON(object.level) : 0,
      source: isSet(object.source) ? Source.fromJSON(object.source) : undefined,
      comment: isSet(object.comment) ? String(object.comment) : "",
      stagedApi: isSet(object.stagedApi) ? Boolean(object.stagedApi) : false,
    };
  },

  toJSON(message: Visibility): unknown {
    const obj: any = {};
    if (message.level !== 0) {
      obj.level = visibility_LevelToJSON(message.level);
    }
    if (message.source !== undefined) {
      obj.source = Source.toJSON(message.source);
    }
    if (message.comment !== "") {
      obj.comment = message.comment;
    }
    if (message.stagedApi === true) {
      obj.stagedApi = message.stagedApi;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Visibility>, I>>(base?: I): Visibility {
    return Visibility.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Visibility>, I>>(object: I): Visibility {
    const message = createBaseVisibility();
    message.level = object.level ?? 0;
    message.source = (object.source !== undefined && object.source !== null)
      ? Source.fromPartial(object.source)
      : undefined;
    message.comment = object.comment ?? "";
    message.stagedApi = object.stagedApi ?? false;
    return message;
  },
};

function createBaseAllowNew(): AllowNew {
  return { source: undefined, comment: "" };
}

export const AllowNew = {
  encode(message: AllowNew, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.source !== undefined) {
      Source.encode(message.source, writer.uint32(10).fork()).ldelim();
    }
    if (message.comment !== "") {
      writer.uint32(18).string(message.comment);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AllowNew {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAllowNew();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.source = Source.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.comment = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AllowNew {
    return {
      source: isSet(object.source) ? Source.fromJSON(object.source) : undefined,
      comment: isSet(object.comment) ? String(object.comment) : "",
    };
  },

  toJSON(message: AllowNew): unknown {
    const obj: any = {};
    if (message.source !== undefined) {
      obj.source = Source.toJSON(message.source);
    }
    if (message.comment !== "") {
      obj.comment = message.comment;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AllowNew>, I>>(base?: I): AllowNew {
    return AllowNew.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AllowNew>, I>>(object: I): AllowNew {
    const message = createBaseAllowNew();
    message.source = (object.source !== undefined && object.source !== null)
      ? Source.fromPartial(object.source)
      : undefined;
    message.comment = object.comment ?? "";
    return message;
  },
};

function createBaseOverlayable(): Overlayable {
  return { name: "", source: undefined, actor: "" };
}

export const Overlayable = {
  encode(message: Overlayable, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.source !== undefined) {
      Source.encode(message.source, writer.uint32(18).fork()).ldelim();
    }
    if (message.actor !== "") {
      writer.uint32(26).string(message.actor);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Overlayable {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOverlayable();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.source = Source.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.actor = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Overlayable {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      source: isSet(object.source) ? Source.fromJSON(object.source) : undefined,
      actor: isSet(object.actor) ? String(object.actor) : "",
    };
  },

  toJSON(message: Overlayable): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.source !== undefined) {
      obj.source = Source.toJSON(message.source);
    }
    if (message.actor !== "") {
      obj.actor = message.actor;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Overlayable>, I>>(base?: I): Overlayable {
    return Overlayable.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Overlayable>, I>>(object: I): Overlayable {
    const message = createBaseOverlayable();
    message.name = object.name ?? "";
    message.source = (object.source !== undefined && object.source !== null)
      ? Source.fromPartial(object.source)
      : undefined;
    message.actor = object.actor ?? "";
    return message;
  },
};

function createBaseOverlayableItem(): OverlayableItem {
  return { source: undefined, comment: "", policy: [], overlayableIdx: 0 };
}

export const OverlayableItem = {
  encode(message: OverlayableItem, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.source !== undefined) {
      Source.encode(message.source, writer.uint32(10).fork()).ldelim();
    }
    if (message.comment !== "") {
      writer.uint32(18).string(message.comment);
    }
    writer.uint32(26).fork();
    for (const v of message.policy) {
      writer.int32(v);
    }
    writer.ldelim();
    if (message.overlayableIdx !== 0) {
      writer.uint32(32).uint32(message.overlayableIdx);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OverlayableItem {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOverlayableItem();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.source = Source.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.comment = reader.string();
          continue;
        case 3:
          if (tag === 24) {
            message.policy.push(reader.int32() as any);

            continue;
          }

          if (tag === 26) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.policy.push(reader.int32() as any);
            }

            continue;
          }

          break;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.overlayableIdx = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): OverlayableItem {
    return {
      source: isSet(object.source) ? Source.fromJSON(object.source) : undefined,
      comment: isSet(object.comment) ? String(object.comment) : "",
      policy: Array.isArray(object?.policy) ? object.policy.map((e: any) => overlayableItem_PolicyFromJSON(e)) : [],
      overlayableIdx: isSet(object.overlayableIdx) ? Number(object.overlayableIdx) : 0,
    };
  },

  toJSON(message: OverlayableItem): unknown {
    const obj: any = {};
    if (message.source !== undefined) {
      obj.source = Source.toJSON(message.source);
    }
    if (message.comment !== "") {
      obj.comment = message.comment;
    }
    if (message.policy?.length) {
      obj.policy = message.policy.map((e) => overlayableItem_PolicyToJSON(e));
    }
    if (message.overlayableIdx !== 0) {
      obj.overlayableIdx = Math.round(message.overlayableIdx);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<OverlayableItem>, I>>(base?: I): OverlayableItem {
    return OverlayableItem.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<OverlayableItem>, I>>(object: I): OverlayableItem {
    const message = createBaseOverlayableItem();
    message.source = (object.source !== undefined && object.source !== null)
      ? Source.fromPartial(object.source)
      : undefined;
    message.comment = object.comment ?? "";
    message.policy = object.policy?.map((e) => e) || [];
    message.overlayableIdx = object.overlayableIdx ?? 0;
    return message;
  },
};

function createBaseStagedId(): StagedId {
  return { source: undefined, stagedId: 0 };
}

export const StagedId = {
  encode(message: StagedId, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.source !== undefined) {
      Source.encode(message.source, writer.uint32(10).fork()).ldelim();
    }
    if (message.stagedId !== 0) {
      writer.uint32(16).uint32(message.stagedId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StagedId {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStagedId();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.source = Source.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.stagedId = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StagedId {
    return {
      source: isSet(object.source) ? Source.fromJSON(object.source) : undefined,
      stagedId: isSet(object.stagedId) ? Number(object.stagedId) : 0,
    };
  },

  toJSON(message: StagedId): unknown {
    const obj: any = {};
    if (message.source !== undefined) {
      obj.source = Source.toJSON(message.source);
    }
    if (message.stagedId !== 0) {
      obj.stagedId = Math.round(message.stagedId);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StagedId>, I>>(base?: I): StagedId {
    return StagedId.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<StagedId>, I>>(object: I): StagedId {
    const message = createBaseStagedId();
    message.source = (object.source !== undefined && object.source !== null)
      ? Source.fromPartial(object.source)
      : undefined;
    message.stagedId = object.stagedId ?? 0;
    return message;
  },
};

function createBaseEntryId(): EntryId {
  return { id: 0 };
}

export const EntryId = {
  encode(message: EntryId, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint32(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EntryId {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEntryId();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.id = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EntryId {
    return { id: isSet(object.id) ? Number(object.id) : 0 };
  },

  toJSON(message: EntryId): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<EntryId>, I>>(base?: I): EntryId {
    return EntryId.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<EntryId>, I>>(object: I): EntryId {
    const message = createBaseEntryId();
    message.id = object.id ?? 0;
    return message;
  },
};

function createBaseEntry(): Entry {
  return {
    entryId: undefined,
    name: "",
    visibility: undefined,
    allowNew: undefined,
    overlayableItem: undefined,
    configValue: [],
    stagedId: undefined,
  };
}

export const Entry = {
  encode(message: Entry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.entryId !== undefined) {
      EntryId.encode(message.entryId, writer.uint32(10).fork()).ldelim();
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.visibility !== undefined) {
      Visibility.encode(message.visibility, writer.uint32(26).fork()).ldelim();
    }
    if (message.allowNew !== undefined) {
      AllowNew.encode(message.allowNew, writer.uint32(34).fork()).ldelim();
    }
    if (message.overlayableItem !== undefined) {
      OverlayableItem.encode(message.overlayableItem, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.configValue) {
      ConfigValue.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    if (message.stagedId !== undefined) {
      StagedId.encode(message.stagedId, writer.uint32(58).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Entry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.entryId = EntryId.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.name = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.visibility = Visibility.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.allowNew = AllowNew.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.overlayableItem = OverlayableItem.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.configValue.push(ConfigValue.decode(reader, reader.uint32()));
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.stagedId = StagedId.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Entry {
    return {
      entryId: isSet(object.entryId) ? EntryId.fromJSON(object.entryId) : undefined,
      name: isSet(object.name) ? String(object.name) : "",
      visibility: isSet(object.visibility) ? Visibility.fromJSON(object.visibility) : undefined,
      allowNew: isSet(object.allowNew) ? AllowNew.fromJSON(object.allowNew) : undefined,
      overlayableItem: isSet(object.overlayableItem) ? OverlayableItem.fromJSON(object.overlayableItem) : undefined,
      configValue: Array.isArray(object?.configValue)
        ? object.configValue.map((e: any) => ConfigValue.fromJSON(e))
        : [],
      stagedId: isSet(object.stagedId) ? StagedId.fromJSON(object.stagedId) : undefined,
    };
  },

  toJSON(message: Entry): unknown {
    const obj: any = {};
    if (message.entryId !== undefined) {
      obj.entryId = EntryId.toJSON(message.entryId);
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.visibility !== undefined) {
      obj.visibility = Visibility.toJSON(message.visibility);
    }
    if (message.allowNew !== undefined) {
      obj.allowNew = AllowNew.toJSON(message.allowNew);
    }
    if (message.overlayableItem !== undefined) {
      obj.overlayableItem = OverlayableItem.toJSON(message.overlayableItem);
    }
    if (message.configValue?.length) {
      obj.configValue = message.configValue.map((e) => ConfigValue.toJSON(e));
    }
    if (message.stagedId !== undefined) {
      obj.stagedId = StagedId.toJSON(message.stagedId);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Entry>, I>>(base?: I): Entry {
    return Entry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Entry>, I>>(object: I): Entry {
    const message = createBaseEntry();
    message.entryId = (object.entryId !== undefined && object.entryId !== null)
      ? EntryId.fromPartial(object.entryId)
      : undefined;
    message.name = object.name ?? "";
    message.visibility = (object.visibility !== undefined && object.visibility !== null)
      ? Visibility.fromPartial(object.visibility)
      : undefined;
    message.allowNew = (object.allowNew !== undefined && object.allowNew !== null)
      ? AllowNew.fromPartial(object.allowNew)
      : undefined;
    message.overlayableItem = (object.overlayableItem !== undefined && object.overlayableItem !== null)
      ? OverlayableItem.fromPartial(object.overlayableItem)
      : undefined;
    message.configValue = object.configValue?.map((e) => ConfigValue.fromPartial(e)) || [];
    message.stagedId = (object.stagedId !== undefined && object.stagedId !== null)
      ? StagedId.fromPartial(object.stagedId)
      : undefined;
    return message;
  },
};

function createBaseConfigValue(): ConfigValue {
  return { config: undefined, value: undefined };
}

export const ConfigValue = {
  encode(message: ConfigValue, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.config !== undefined) {
      Configuration.encode(message.config, writer.uint32(10).fork()).ldelim();
    }
    if (message.value !== undefined) {
      Value.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConfigValue {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConfigValue();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.config = Configuration.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = Value.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ConfigValue {
    return {
      config: isSet(object.config) ? Configuration.fromJSON(object.config) : undefined,
      value: isSet(object.value) ? Value.fromJSON(object.value) : undefined,
    };
  },

  toJSON(message: ConfigValue): unknown {
    const obj: any = {};
    if (message.config !== undefined) {
      obj.config = Configuration.toJSON(message.config);
    }
    if (message.value !== undefined) {
      obj.value = Value.toJSON(message.value);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ConfigValue>, I>>(base?: I): ConfigValue {
    return ConfigValue.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ConfigValue>, I>>(object: I): ConfigValue {
    const message = createBaseConfigValue();
    message.config = (object.config !== undefined && object.config !== null)
      ? Configuration.fromPartial(object.config)
      : undefined;
    message.value = (object.value !== undefined && object.value !== null) ? Value.fromPartial(object.value) : undefined;
    return message;
  },
};

function createBaseValue(): Value {
  return { source: undefined, comment: "", weak: false, item: undefined, compoundValue: undefined };
}

export const Value = {
  encode(message: Value, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.source !== undefined) {
      Source.encode(message.source, writer.uint32(10).fork()).ldelim();
    }
    if (message.comment !== "") {
      writer.uint32(18).string(message.comment);
    }
    if (message.weak === true) {
      writer.uint32(24).bool(message.weak);
    }
    if (message.item !== undefined) {
      Item.encode(message.item, writer.uint32(34).fork()).ldelim();
    }
    if (message.compoundValue !== undefined) {
      CompoundValue.encode(message.compoundValue, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Value {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValue();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.source = Source.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.comment = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.weak = reader.bool();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.item = Item.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.compoundValue = CompoundValue.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Value {
    return {
      source: isSet(object.source) ? Source.fromJSON(object.source) : undefined,
      comment: isSet(object.comment) ? String(object.comment) : "",
      weak: isSet(object.weak) ? Boolean(object.weak) : false,
      item: isSet(object.item) ? Item.fromJSON(object.item) : undefined,
      compoundValue: isSet(object.compoundValue) ? CompoundValue.fromJSON(object.compoundValue) : undefined,
    };
  },

  toJSON(message: Value): unknown {
    const obj: any = {};
    if (message.source !== undefined) {
      obj.source = Source.toJSON(message.source);
    }
    if (message.comment !== "") {
      obj.comment = message.comment;
    }
    if (message.weak === true) {
      obj.weak = message.weak;
    }
    if (message.item !== undefined) {
      obj.item = Item.toJSON(message.item);
    }
    if (message.compoundValue !== undefined) {
      obj.compoundValue = CompoundValue.toJSON(message.compoundValue);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Value>, I>>(base?: I): Value {
    return Value.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Value>, I>>(object: I): Value {
    const message = createBaseValue();
    message.source = (object.source !== undefined && object.source !== null)
      ? Source.fromPartial(object.source)
      : undefined;
    message.comment = object.comment ?? "";
    message.weak = object.weak ?? false;
    message.item = (object.item !== undefined && object.item !== null) ? Item.fromPartial(object.item) : undefined;
    message.compoundValue = (object.compoundValue !== undefined && object.compoundValue !== null)
      ? CompoundValue.fromPartial(object.compoundValue)
      : undefined;
    return message;
  },
};

function createBaseItem(): Item {
  return {
    ref: undefined,
    str: undefined,
    rawStr: undefined,
    styledStr: undefined,
    file: undefined,
    id: undefined,
    prim: undefined,
  };
}

export const Item = {
  encode(message: Item, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.ref !== undefined) {
      Reference.encode(message.ref, writer.uint32(10).fork()).ldelim();
    }
    if (message.str !== undefined) {
      String.encode(message.str, writer.uint32(18).fork()).ldelim();
    }
    if (message.rawStr !== undefined) {
      RawString.encode(message.rawStr, writer.uint32(26).fork()).ldelim();
    }
    if (message.styledStr !== undefined) {
      StyledString.encode(message.styledStr, writer.uint32(34).fork()).ldelim();
    }
    if (message.file !== undefined) {
      FileReference.encode(message.file, writer.uint32(42).fork()).ldelim();
    }
    if (message.id !== undefined) {
      Id.encode(message.id, writer.uint32(50).fork()).ldelim();
    }
    if (message.prim !== undefined) {
      Primitive.encode(message.prim, writer.uint32(58).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Item {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseItem();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.ref = Reference.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.str = String.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.rawStr = RawString.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.styledStr = StyledString.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.file = FileReference.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.id = Id.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.prim = Primitive.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Item {
    return {
      ref: isSet(object.ref) ? Reference.fromJSON(object.ref) : undefined,
      str: isSet(object.str) ? String.fromJSON(object.str) : undefined,
      rawStr: isSet(object.rawStr) ? RawString.fromJSON(object.rawStr) : undefined,
      styledStr: isSet(object.styledStr) ? StyledString.fromJSON(object.styledStr) : undefined,
      file: isSet(object.file) ? FileReference.fromJSON(object.file) : undefined,
      id: isSet(object.id) ? Id.fromJSON(object.id) : undefined,
      prim: isSet(object.prim) ? Primitive.fromJSON(object.prim) : undefined,
    };
  },

  toJSON(message: Item): unknown {
    const obj: any = {};
    if (message.ref !== undefined) {
      obj.ref = Reference.toJSON(message.ref);
    }
    if (message.str !== undefined) {
      obj.str = String.toJSON(message.str);
    }
    if (message.rawStr !== undefined) {
      obj.rawStr = RawString.toJSON(message.rawStr);
    }
    if (message.styledStr !== undefined) {
      obj.styledStr = StyledString.toJSON(message.styledStr);
    }
    if (message.file !== undefined) {
      obj.file = FileReference.toJSON(message.file);
    }
    if (message.id !== undefined) {
      obj.id = Id.toJSON(message.id);
    }
    if (message.prim !== undefined) {
      obj.prim = Primitive.toJSON(message.prim);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Item>, I>>(base?: I): Item {
    return Item.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Item>, I>>(object: I): Item {
    const message = createBaseItem();
    message.ref = (object.ref !== undefined && object.ref !== null) ? Reference.fromPartial(object.ref) : undefined;
    message.str = (object.str !== undefined && object.str !== null) ? String.fromPartial(object.str) : undefined;
    message.rawStr = (object.rawStr !== undefined && object.rawStr !== null)
      ? RawString.fromPartial(object.rawStr)
      : undefined;
    message.styledStr = (object.styledStr !== undefined && object.styledStr !== null)
      ? StyledString.fromPartial(object.styledStr)
      : undefined;
    message.file = (object.file !== undefined && object.file !== null)
      ? FileReference.fromPartial(object.file)
      : undefined;
    message.id = (object.id !== undefined && object.id !== null) ? Id.fromPartial(object.id) : undefined;
    message.prim = (object.prim !== undefined && object.prim !== null) ? Primitive.fromPartial(object.prim) : undefined;
    return message;
  },
};

function createBaseCompoundValue(): CompoundValue {
  return {
    attr: undefined,
    style: undefined,
    styleable: undefined,
    array: undefined,
    plural: undefined,
    macro: undefined,
  };
}

export const CompoundValue = {
  encode(message: CompoundValue, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.attr !== undefined) {
      Attribute.encode(message.attr, writer.uint32(10).fork()).ldelim();
    }
    if (message.style !== undefined) {
      Style.encode(message.style, writer.uint32(18).fork()).ldelim();
    }
    if (message.styleable !== undefined) {
      Styleable.encode(message.styleable, writer.uint32(26).fork()).ldelim();
    }
    if (message.array !== undefined) {
      Array.encode(message.array, writer.uint32(34).fork()).ldelim();
    }
    if (message.plural !== undefined) {
      Plural.encode(message.plural, writer.uint32(42).fork()).ldelim();
    }
    if (message.macro !== undefined) {
      MacroBody.encode(message.macro, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CompoundValue {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCompoundValue();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.attr = Attribute.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.style = Style.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.styleable = Styleable.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.array = Array.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.plural = Plural.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.macro = MacroBody.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CompoundValue {
    return {
      attr: isSet(object.attr) ? Attribute.fromJSON(object.attr) : undefined,
      style: isSet(object.style) ? Style.fromJSON(object.style) : undefined,
      styleable: isSet(object.styleable) ? Styleable.fromJSON(object.styleable) : undefined,
      array: isSet(object.array) ? Array.fromJSON(object.array) : undefined,
      plural: isSet(object.plural) ? Plural.fromJSON(object.plural) : undefined,
      macro: isSet(object.macro) ? MacroBody.fromJSON(object.macro) : undefined,
    };
  },

  toJSON(message: CompoundValue): unknown {
    const obj: any = {};
    if (message.attr !== undefined) {
      obj.attr = Attribute.toJSON(message.attr);
    }
    if (message.style !== undefined) {
      obj.style = Style.toJSON(message.style);
    }
    if (message.styleable !== undefined) {
      obj.styleable = Styleable.toJSON(message.styleable);
    }
    if (message.array !== undefined) {
      obj.array = Array.toJSON(message.array);
    }
    if (message.plural !== undefined) {
      obj.plural = Plural.toJSON(message.plural);
    }
    if (message.macro !== undefined) {
      obj.macro = MacroBody.toJSON(message.macro);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CompoundValue>, I>>(base?: I): CompoundValue {
    return CompoundValue.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CompoundValue>, I>>(object: I): CompoundValue {
    const message = createBaseCompoundValue();
    message.attr = (object.attr !== undefined && object.attr !== null) ? Attribute.fromPartial(object.attr) : undefined;
    message.style = (object.style !== undefined && object.style !== null) ? Style.fromPartial(object.style) : undefined;
    message.styleable = (object.styleable !== undefined && object.styleable !== null)
      ? Styleable.fromPartial(object.styleable)
      : undefined;
    message.array = (object.array !== undefined && object.array !== null) ? Array.fromPartial(object.array) : undefined;
    message.plural = (object.plural !== undefined && object.plural !== null)
      ? Plural.fromPartial(object.plural)
      : undefined;
    message.macro = (object.macro !== undefined && object.macro !== null)
      ? MacroBody.fromPartial(object.macro)
      : undefined;
    return message;
  },
};

function createBaseBoolean(): Boolean {
  return { value: false };
}

export const Boolean = {
  encode(message: Boolean, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.value === true) {
      writer.uint32(8).bool(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Boolean {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBoolean();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.value = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Boolean {
    return { value: isSet(object.value) ? Boolean(object.value) : false };
  },

  toJSON(message: Boolean): unknown {
    const obj: any = {};
    if (message.value === true) {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Boolean>, I>>(base?: I): Boolean {
    return Boolean.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Boolean>, I>>(object: I): Boolean {
    const message = createBaseBoolean();
    message.value = object.value ?? false;
    return message;
  },
};

function createBaseReference(): Reference {
  return { type: 0, id: 0, name: "", private: false, isDynamic: undefined, typeFlags: 0, allowRaw: false };
}

export const Reference = {
  encode(message: Reference, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint32(message.id);
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    if (message.private === true) {
      writer.uint32(32).bool(message.private);
    }
    if (message.isDynamic !== undefined) {
      Boolean.encode(message.isDynamic, writer.uint32(42).fork()).ldelim();
    }
    if (message.typeFlags !== 0) {
      writer.uint32(48).uint32(message.typeFlags);
    }
    if (message.allowRaw === true) {
      writer.uint32(56).bool(message.allowRaw);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Reference {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseReference();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.type = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.id = reader.uint32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.name = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.private = reader.bool();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.isDynamic = Boolean.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.typeFlags = reader.uint32();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.allowRaw = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Reference {
    return {
      type: isSet(object.type) ? reference_TypeFromJSON(object.type) : 0,
      id: isSet(object.id) ? Number(object.id) : 0,
      name: isSet(object.name) ? String(object.name) : "",
      private: isSet(object.private) ? Boolean(object.private) : false,
      isDynamic: isSet(object.isDynamic) ? Boolean.fromJSON(object.isDynamic) : undefined,
      typeFlags: isSet(object.typeFlags) ? Number(object.typeFlags) : 0,
      allowRaw: isSet(object.allowRaw) ? Boolean(object.allowRaw) : false,
    };
  },

  toJSON(message: Reference): unknown {
    const obj: any = {};
    if (message.type !== 0) {
      obj.type = reference_TypeToJSON(message.type);
    }
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.private === true) {
      obj.private = message.private;
    }
    if (message.isDynamic !== undefined) {
      obj.isDynamic = Boolean.toJSON(message.isDynamic);
    }
    if (message.typeFlags !== 0) {
      obj.typeFlags = Math.round(message.typeFlags);
    }
    if (message.allowRaw === true) {
      obj.allowRaw = message.allowRaw;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Reference>, I>>(base?: I): Reference {
    return Reference.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Reference>, I>>(object: I): Reference {
    const message = createBaseReference();
    message.type = object.type ?? 0;
    message.id = object.id ?? 0;
    message.name = object.name ?? "";
    message.private = object.private ?? false;
    message.isDynamic = (object.isDynamic !== undefined && object.isDynamic !== null)
      ? Boolean.fromPartial(object.isDynamic)
      : undefined;
    message.typeFlags = object.typeFlags ?? 0;
    message.allowRaw = object.allowRaw ?? false;
    return message;
  },
};

function createBaseId(): Id {
  return {};
}

export const Id = {
  encode(_: Id, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Id {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseId();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): Id {
    return {};
  },

  toJSON(_: Id): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<Id>, I>>(base?: I): Id {
    return Id.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Id>, I>>(_: I): Id {
    const message = createBaseId();
    return message;
  },
};

function createBaseString(): String {
  return { value: "" };
}

export const String = {
  encode(message: String, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.value !== "") {
      writer.uint32(10).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): String {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseString();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
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

  fromJSON(object: any): String {
    return { value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: String): unknown {
    const obj: any = {};
    if (message.value !== "") {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<String>, I>>(base?: I): String {
    return String.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<String>, I>>(object: I): String {
    const message = createBaseString();
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseRawString(): RawString {
  return { value: "" };
}

export const RawString = {
  encode(message: RawString, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.value !== "") {
      writer.uint32(10).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RawString {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRawString();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
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

  fromJSON(object: any): RawString {
    return { value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: RawString): unknown {
    const obj: any = {};
    if (message.value !== "") {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RawString>, I>>(base?: I): RawString {
    return RawString.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RawString>, I>>(object: I): RawString {
    const message = createBaseRawString();
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseStyledString(): StyledString {
  return { value: "", span: [] };
}

export const StyledString = {
  encode(message: StyledString, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.value !== "") {
      writer.uint32(10).string(message.value);
    }
    for (const v of message.span) {
      StyledString_Span.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StyledString {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStyledString();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.value = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.span.push(StyledString_Span.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StyledString {
    return {
      value: isSet(object.value) ? String(object.value) : "",
      span: Array.isArray(object?.span) ? object.span.map((e: any) => StyledString_Span.fromJSON(e)) : [],
    };
  },

  toJSON(message: StyledString): unknown {
    const obj: any = {};
    if (message.value !== "") {
      obj.value = message.value;
    }
    if (message.span?.length) {
      obj.span = message.span.map((e) => StyledString_Span.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StyledString>, I>>(base?: I): StyledString {
    return StyledString.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<StyledString>, I>>(object: I): StyledString {
    const message = createBaseStyledString();
    message.value = object.value ?? "";
    message.span = object.span?.map((e) => StyledString_Span.fromPartial(e)) || [];
    return message;
  },
};

function createBaseStyledString_Span(): StyledString_Span {
  return { tag: "", firstChar: 0, lastChar: 0 };
}

export const StyledString_Span = {
  encode(message: StyledString_Span, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.tag !== "") {
      writer.uint32(10).string(message.tag);
    }
    if (message.firstChar !== 0) {
      writer.uint32(16).uint32(message.firstChar);
    }
    if (message.lastChar !== 0) {
      writer.uint32(24).uint32(message.lastChar);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StyledString_Span {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStyledString_Span();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.tag = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.firstChar = reader.uint32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.lastChar = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StyledString_Span {
    return {
      tag: isSet(object.tag) ? String(object.tag) : "",
      firstChar: isSet(object.firstChar) ? Number(object.firstChar) : 0,
      lastChar: isSet(object.lastChar) ? Number(object.lastChar) : 0,
    };
  },

  toJSON(message: StyledString_Span): unknown {
    const obj: any = {};
    if (message.tag !== "") {
      obj.tag = message.tag;
    }
    if (message.firstChar !== 0) {
      obj.firstChar = Math.round(message.firstChar);
    }
    if (message.lastChar !== 0) {
      obj.lastChar = Math.round(message.lastChar);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StyledString_Span>, I>>(base?: I): StyledString_Span {
    return StyledString_Span.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<StyledString_Span>, I>>(object: I): StyledString_Span {
    const message = createBaseStyledString_Span();
    message.tag = object.tag ?? "";
    message.firstChar = object.firstChar ?? 0;
    message.lastChar = object.lastChar ?? 0;
    return message;
  },
};

function createBaseFileReference(): FileReference {
  return { path: "", type: 0 };
}

export const FileReference = {
  encode(message: FileReference, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.path !== "") {
      writer.uint32(10).string(message.path);
    }
    if (message.type !== 0) {
      writer.uint32(16).int32(message.type);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FileReference {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFileReference();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.path = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.type = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FileReference {
    return {
      path: isSet(object.path) ? String(object.path) : "",
      type: isSet(object.type) ? fileReference_TypeFromJSON(object.type) : 0,
    };
  },

  toJSON(message: FileReference): unknown {
    const obj: any = {};
    if (message.path !== "") {
      obj.path = message.path;
    }
    if (message.type !== 0) {
      obj.type = fileReference_TypeToJSON(message.type);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FileReference>, I>>(base?: I): FileReference {
    return FileReference.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FileReference>, I>>(object: I): FileReference {
    const message = createBaseFileReference();
    message.path = object.path ?? "";
    message.type = object.type ?? 0;
    return message;
  },
};

function createBasePrimitive(): Primitive {
  return {
    nullValue: undefined,
    emptyValue: undefined,
    floatValue: undefined,
    dimensionValue: undefined,
    fractionValue: undefined,
    intDecimalValue: undefined,
    intHexadecimalValue: undefined,
    booleanValue: undefined,
    colorArgb8Value: undefined,
    colorRgb8Value: undefined,
    colorArgb4Value: undefined,
    colorRgb4Value: undefined,
    dimensionValueDeprecated: undefined,
    fractionValueDeprecated: undefined,
  };
}

export const Primitive = {
  encode(message: Primitive, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.nullValue !== undefined) {
      Primitive_NullType.encode(message.nullValue, writer.uint32(10).fork()).ldelim();
    }
    if (message.emptyValue !== undefined) {
      Primitive_EmptyType.encode(message.emptyValue, writer.uint32(18).fork()).ldelim();
    }
    if (message.floatValue !== undefined) {
      writer.uint32(29).float(message.floatValue);
    }
    if (message.dimensionValue !== undefined) {
      writer.uint32(104).uint32(message.dimensionValue);
    }
    if (message.fractionValue !== undefined) {
      writer.uint32(112).uint32(message.fractionValue);
    }
    if (message.intDecimalValue !== undefined) {
      writer.uint32(48).int32(message.intDecimalValue);
    }
    if (message.intHexadecimalValue !== undefined) {
      writer.uint32(56).uint32(message.intHexadecimalValue);
    }
    if (message.booleanValue !== undefined) {
      writer.uint32(64).bool(message.booleanValue);
    }
    if (message.colorArgb8Value !== undefined) {
      writer.uint32(72).uint32(message.colorArgb8Value);
    }
    if (message.colorRgb8Value !== undefined) {
      writer.uint32(80).uint32(message.colorRgb8Value);
    }
    if (message.colorArgb4Value !== undefined) {
      writer.uint32(88).uint32(message.colorArgb4Value);
    }
    if (message.colorRgb4Value !== undefined) {
      writer.uint32(96).uint32(message.colorRgb4Value);
    }
    if (message.dimensionValueDeprecated !== undefined) {
      writer.uint32(37).float(message.dimensionValueDeprecated);
    }
    if (message.fractionValueDeprecated !== undefined) {
      writer.uint32(45).float(message.fractionValueDeprecated);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Primitive {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePrimitive();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.nullValue = Primitive_NullType.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.emptyValue = Primitive_EmptyType.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 29) {
            break;
          }

          message.floatValue = reader.float();
          continue;
        case 13:
          if (tag !== 104) {
            break;
          }

          message.dimensionValue = reader.uint32();
          continue;
        case 14:
          if (tag !== 112) {
            break;
          }

          message.fractionValue = reader.uint32();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.intDecimalValue = reader.int32();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.intHexadecimalValue = reader.uint32();
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.booleanValue = reader.bool();
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.colorArgb8Value = reader.uint32();
          continue;
        case 10:
          if (tag !== 80) {
            break;
          }

          message.colorRgb8Value = reader.uint32();
          continue;
        case 11:
          if (tag !== 88) {
            break;
          }

          message.colorArgb4Value = reader.uint32();
          continue;
        case 12:
          if (tag !== 96) {
            break;
          }

          message.colorRgb4Value = reader.uint32();
          continue;
        case 4:
          if (tag !== 37) {
            break;
          }

          message.dimensionValueDeprecated = reader.float();
          continue;
        case 5:
          if (tag !== 45) {
            break;
          }

          message.fractionValueDeprecated = reader.float();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Primitive {
    return {
      nullValue: isSet(object.nullValue) ? Primitive_NullType.fromJSON(object.nullValue) : undefined,
      emptyValue: isSet(object.emptyValue) ? Primitive_EmptyType.fromJSON(object.emptyValue) : undefined,
      floatValue: isSet(object.floatValue) ? Number(object.floatValue) : undefined,
      dimensionValue: isSet(object.dimensionValue) ? Number(object.dimensionValue) : undefined,
      fractionValue: isSet(object.fractionValue) ? Number(object.fractionValue) : undefined,
      intDecimalValue: isSet(object.intDecimalValue) ? Number(object.intDecimalValue) : undefined,
      intHexadecimalValue: isSet(object.intHexadecimalValue) ? Number(object.intHexadecimalValue) : undefined,
      booleanValue: isSet(object.booleanValue) ? Boolean(object.booleanValue) : undefined,
      colorArgb8Value: isSet(object.colorArgb8Value) ? Number(object.colorArgb8Value) : undefined,
      colorRgb8Value: isSet(object.colorRgb8Value) ? Number(object.colorRgb8Value) : undefined,
      colorArgb4Value: isSet(object.colorArgb4Value) ? Number(object.colorArgb4Value) : undefined,
      colorRgb4Value: isSet(object.colorRgb4Value) ? Number(object.colorRgb4Value) : undefined,
      dimensionValueDeprecated: isSet(object.dimensionValueDeprecated)
        ? Number(object.dimensionValueDeprecated)
        : undefined,
      fractionValueDeprecated: isSet(object.fractionValueDeprecated)
        ? Number(object.fractionValueDeprecated)
        : undefined,
    };
  },

  toJSON(message: Primitive): unknown {
    const obj: any = {};
    if (message.nullValue !== undefined) {
      obj.nullValue = Primitive_NullType.toJSON(message.nullValue);
    }
    if (message.emptyValue !== undefined) {
      obj.emptyValue = Primitive_EmptyType.toJSON(message.emptyValue);
    }
    if (message.floatValue !== undefined) {
      obj.floatValue = message.floatValue;
    }
    if (message.dimensionValue !== undefined) {
      obj.dimensionValue = Math.round(message.dimensionValue);
    }
    if (message.fractionValue !== undefined) {
      obj.fractionValue = Math.round(message.fractionValue);
    }
    if (message.intDecimalValue !== undefined) {
      obj.intDecimalValue = Math.round(message.intDecimalValue);
    }
    if (message.intHexadecimalValue !== undefined) {
      obj.intHexadecimalValue = Math.round(message.intHexadecimalValue);
    }
    if (message.booleanValue !== undefined) {
      obj.booleanValue = message.booleanValue;
    }
    if (message.colorArgb8Value !== undefined) {
      obj.colorArgb8Value = Math.round(message.colorArgb8Value);
    }
    if (message.colorRgb8Value !== undefined) {
      obj.colorRgb8Value = Math.round(message.colorRgb8Value);
    }
    if (message.colorArgb4Value !== undefined) {
      obj.colorArgb4Value = Math.round(message.colorArgb4Value);
    }
    if (message.colorRgb4Value !== undefined) {
      obj.colorRgb4Value = Math.round(message.colorRgb4Value);
    }
    if (message.dimensionValueDeprecated !== undefined) {
      obj.dimensionValueDeprecated = message.dimensionValueDeprecated;
    }
    if (message.fractionValueDeprecated !== undefined) {
      obj.fractionValueDeprecated = message.fractionValueDeprecated;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Primitive>, I>>(base?: I): Primitive {
    return Primitive.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Primitive>, I>>(object: I): Primitive {
    const message = createBasePrimitive();
    message.nullValue = (object.nullValue !== undefined && object.nullValue !== null)
      ? Primitive_NullType.fromPartial(object.nullValue)
      : undefined;
    message.emptyValue = (object.emptyValue !== undefined && object.emptyValue !== null)
      ? Primitive_EmptyType.fromPartial(object.emptyValue)
      : undefined;
    message.floatValue = object.floatValue ?? undefined;
    message.dimensionValue = object.dimensionValue ?? undefined;
    message.fractionValue = object.fractionValue ?? undefined;
    message.intDecimalValue = object.intDecimalValue ?? undefined;
    message.intHexadecimalValue = object.intHexadecimalValue ?? undefined;
    message.booleanValue = object.booleanValue ?? undefined;
    message.colorArgb8Value = object.colorArgb8Value ?? undefined;
    message.colorRgb8Value = object.colorRgb8Value ?? undefined;
    message.colorArgb4Value = object.colorArgb4Value ?? undefined;
    message.colorRgb4Value = object.colorRgb4Value ?? undefined;
    message.dimensionValueDeprecated = object.dimensionValueDeprecated ?? undefined;
    message.fractionValueDeprecated = object.fractionValueDeprecated ?? undefined;
    return message;
  },
};

function createBasePrimitive_NullType(): Primitive_NullType {
  return {};
}

export const Primitive_NullType = {
  encode(_: Primitive_NullType, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Primitive_NullType {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePrimitive_NullType();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): Primitive_NullType {
    return {};
  },

  toJSON(_: Primitive_NullType): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<Primitive_NullType>, I>>(base?: I): Primitive_NullType {
    return Primitive_NullType.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Primitive_NullType>, I>>(_: I): Primitive_NullType {
    const message = createBasePrimitive_NullType();
    return message;
  },
};

function createBasePrimitive_EmptyType(): Primitive_EmptyType {
  return {};
}

export const Primitive_EmptyType = {
  encode(_: Primitive_EmptyType, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Primitive_EmptyType {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePrimitive_EmptyType();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): Primitive_EmptyType {
    return {};
  },

  toJSON(_: Primitive_EmptyType): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<Primitive_EmptyType>, I>>(base?: I): Primitive_EmptyType {
    return Primitive_EmptyType.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Primitive_EmptyType>, I>>(_: I): Primitive_EmptyType {
    const message = createBasePrimitive_EmptyType();
    return message;
  },
};

function createBaseAttribute(): Attribute {
  return { formatFlags: 0, minInt: 0, maxInt: 0, symbol: [] };
}

export const Attribute = {
  encode(message: Attribute, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.formatFlags !== 0) {
      writer.uint32(8).uint32(message.formatFlags);
    }
    if (message.minInt !== 0) {
      writer.uint32(16).int32(message.minInt);
    }
    if (message.maxInt !== 0) {
      writer.uint32(24).int32(message.maxInt);
    }
    for (const v of message.symbol) {
      Attribute_Symbol.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Attribute {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAttribute();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.formatFlags = reader.uint32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.minInt = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.maxInt = reader.int32();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.symbol.push(Attribute_Symbol.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Attribute {
    return {
      formatFlags: isSet(object.formatFlags) ? Number(object.formatFlags) : 0,
      minInt: isSet(object.minInt) ? Number(object.minInt) : 0,
      maxInt: isSet(object.maxInt) ? Number(object.maxInt) : 0,
      symbol: Array.isArray(object?.symbol) ? object.symbol.map((e: any) => Attribute_Symbol.fromJSON(e)) : [],
    };
  },

  toJSON(message: Attribute): unknown {
    const obj: any = {};
    if (message.formatFlags !== 0) {
      obj.formatFlags = Math.round(message.formatFlags);
    }
    if (message.minInt !== 0) {
      obj.minInt = Math.round(message.minInt);
    }
    if (message.maxInt !== 0) {
      obj.maxInt = Math.round(message.maxInt);
    }
    if (message.symbol?.length) {
      obj.symbol = message.symbol.map((e) => Attribute_Symbol.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Attribute>, I>>(base?: I): Attribute {
    return Attribute.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Attribute>, I>>(object: I): Attribute {
    const message = createBaseAttribute();
    message.formatFlags = object.formatFlags ?? 0;
    message.minInt = object.minInt ?? 0;
    message.maxInt = object.maxInt ?? 0;
    message.symbol = object.symbol?.map((e) => Attribute_Symbol.fromPartial(e)) || [];
    return message;
  },
};

function createBaseAttribute_Symbol(): Attribute_Symbol {
  return { source: undefined, comment: "", name: undefined, value: 0, type: 0 };
}

export const Attribute_Symbol = {
  encode(message: Attribute_Symbol, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.source !== undefined) {
      Source.encode(message.source, writer.uint32(10).fork()).ldelim();
    }
    if (message.comment !== "") {
      writer.uint32(18).string(message.comment);
    }
    if (message.name !== undefined) {
      Reference.encode(message.name, writer.uint32(26).fork()).ldelim();
    }
    if (message.value !== 0) {
      writer.uint32(32).uint32(message.value);
    }
    if (message.type !== 0) {
      writer.uint32(40).uint32(message.type);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Attribute_Symbol {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAttribute_Symbol();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.source = Source.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.comment = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.name = Reference.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.value = reader.uint32();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.type = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Attribute_Symbol {
    return {
      source: isSet(object.source) ? Source.fromJSON(object.source) : undefined,
      comment: isSet(object.comment) ? String(object.comment) : "",
      name: isSet(object.name) ? Reference.fromJSON(object.name) : undefined,
      value: isSet(object.value) ? Number(object.value) : 0,
      type: isSet(object.type) ? Number(object.type) : 0,
    };
  },

  toJSON(message: Attribute_Symbol): unknown {
    const obj: any = {};
    if (message.source !== undefined) {
      obj.source = Source.toJSON(message.source);
    }
    if (message.comment !== "") {
      obj.comment = message.comment;
    }
    if (message.name !== undefined) {
      obj.name = Reference.toJSON(message.name);
    }
    if (message.value !== 0) {
      obj.value = Math.round(message.value);
    }
    if (message.type !== 0) {
      obj.type = Math.round(message.type);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Attribute_Symbol>, I>>(base?: I): Attribute_Symbol {
    return Attribute_Symbol.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Attribute_Symbol>, I>>(object: I): Attribute_Symbol {
    const message = createBaseAttribute_Symbol();
    message.source = (object.source !== undefined && object.source !== null)
      ? Source.fromPartial(object.source)
      : undefined;
    message.comment = object.comment ?? "";
    message.name = (object.name !== undefined && object.name !== null) ? Reference.fromPartial(object.name) : undefined;
    message.value = object.value ?? 0;
    message.type = object.type ?? 0;
    return message;
  },
};

function createBaseStyle(): Style {
  return { parent: undefined, parentSource: undefined, entry: [] };
}

export const Style = {
  encode(message: Style, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.parent !== undefined) {
      Reference.encode(message.parent, writer.uint32(10).fork()).ldelim();
    }
    if (message.parentSource !== undefined) {
      Source.encode(message.parentSource, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.entry) {
      Style_Entry.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Style {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStyle();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.parent = Reference.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.parentSource = Source.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.entry.push(Style_Entry.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Style {
    return {
      parent: isSet(object.parent) ? Reference.fromJSON(object.parent) : undefined,
      parentSource: isSet(object.parentSource) ? Source.fromJSON(object.parentSource) : undefined,
      entry: Array.isArray(object?.entry) ? object.entry.map((e: any) => Style_Entry.fromJSON(e)) : [],
    };
  },

  toJSON(message: Style): unknown {
    const obj: any = {};
    if (message.parent !== undefined) {
      obj.parent = Reference.toJSON(message.parent);
    }
    if (message.parentSource !== undefined) {
      obj.parentSource = Source.toJSON(message.parentSource);
    }
    if (message.entry?.length) {
      obj.entry = message.entry.map((e) => Style_Entry.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Style>, I>>(base?: I): Style {
    return Style.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Style>, I>>(object: I): Style {
    const message = createBaseStyle();
    message.parent = (object.parent !== undefined && object.parent !== null)
      ? Reference.fromPartial(object.parent)
      : undefined;
    message.parentSource = (object.parentSource !== undefined && object.parentSource !== null)
      ? Source.fromPartial(object.parentSource)
      : undefined;
    message.entry = object.entry?.map((e) => Style_Entry.fromPartial(e)) || [];
    return message;
  },
};

function createBaseStyle_Entry(): Style_Entry {
  return { source: undefined, comment: "", key: undefined, item: undefined };
}

export const Style_Entry = {
  encode(message: Style_Entry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.source !== undefined) {
      Source.encode(message.source, writer.uint32(10).fork()).ldelim();
    }
    if (message.comment !== "") {
      writer.uint32(18).string(message.comment);
    }
    if (message.key !== undefined) {
      Reference.encode(message.key, writer.uint32(26).fork()).ldelim();
    }
    if (message.item !== undefined) {
      Item.encode(message.item, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Style_Entry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStyle_Entry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.source = Source.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.comment = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.key = Reference.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.item = Item.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Style_Entry {
    return {
      source: isSet(object.source) ? Source.fromJSON(object.source) : undefined,
      comment: isSet(object.comment) ? String(object.comment) : "",
      key: isSet(object.key) ? Reference.fromJSON(object.key) : undefined,
      item: isSet(object.item) ? Item.fromJSON(object.item) : undefined,
    };
  },

  toJSON(message: Style_Entry): unknown {
    const obj: any = {};
    if (message.source !== undefined) {
      obj.source = Source.toJSON(message.source);
    }
    if (message.comment !== "") {
      obj.comment = message.comment;
    }
    if (message.key !== undefined) {
      obj.key = Reference.toJSON(message.key);
    }
    if (message.item !== undefined) {
      obj.item = Item.toJSON(message.item);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Style_Entry>, I>>(base?: I): Style_Entry {
    return Style_Entry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Style_Entry>, I>>(object: I): Style_Entry {
    const message = createBaseStyle_Entry();
    message.source = (object.source !== undefined && object.source !== null)
      ? Source.fromPartial(object.source)
      : undefined;
    message.comment = object.comment ?? "";
    message.key = (object.key !== undefined && object.key !== null) ? Reference.fromPartial(object.key) : undefined;
    message.item = (object.item !== undefined && object.item !== null) ? Item.fromPartial(object.item) : undefined;
    return message;
  },
};

function createBaseStyleable(): Styleable {
  return { entry: [] };
}

export const Styleable = {
  encode(message: Styleable, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.entry) {
      Styleable_Entry.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Styleable {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStyleable();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.entry.push(Styleable_Entry.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Styleable {
    return { entry: Array.isArray(object?.entry) ? object.entry.map((e: any) => Styleable_Entry.fromJSON(e)) : [] };
  },

  toJSON(message: Styleable): unknown {
    const obj: any = {};
    if (message.entry?.length) {
      obj.entry = message.entry.map((e) => Styleable_Entry.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Styleable>, I>>(base?: I): Styleable {
    return Styleable.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Styleable>, I>>(object: I): Styleable {
    const message = createBaseStyleable();
    message.entry = object.entry?.map((e) => Styleable_Entry.fromPartial(e)) || [];
    return message;
  },
};

function createBaseStyleable_Entry(): Styleable_Entry {
  return { source: undefined, comment: "", attr: undefined };
}

export const Styleable_Entry = {
  encode(message: Styleable_Entry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.source !== undefined) {
      Source.encode(message.source, writer.uint32(10).fork()).ldelim();
    }
    if (message.comment !== "") {
      writer.uint32(18).string(message.comment);
    }
    if (message.attr !== undefined) {
      Reference.encode(message.attr, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Styleable_Entry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStyleable_Entry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.source = Source.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.comment = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.attr = Reference.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Styleable_Entry {
    return {
      source: isSet(object.source) ? Source.fromJSON(object.source) : undefined,
      comment: isSet(object.comment) ? String(object.comment) : "",
      attr: isSet(object.attr) ? Reference.fromJSON(object.attr) : undefined,
    };
  },

  toJSON(message: Styleable_Entry): unknown {
    const obj: any = {};
    if (message.source !== undefined) {
      obj.source = Source.toJSON(message.source);
    }
    if (message.comment !== "") {
      obj.comment = message.comment;
    }
    if (message.attr !== undefined) {
      obj.attr = Reference.toJSON(message.attr);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Styleable_Entry>, I>>(base?: I): Styleable_Entry {
    return Styleable_Entry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Styleable_Entry>, I>>(object: I): Styleable_Entry {
    const message = createBaseStyleable_Entry();
    message.source = (object.source !== undefined && object.source !== null)
      ? Source.fromPartial(object.source)
      : undefined;
    message.comment = object.comment ?? "";
    message.attr = (object.attr !== undefined && object.attr !== null) ? Reference.fromPartial(object.attr) : undefined;
    return message;
  },
};

function createBaseArray(): Array {
  return { element: [] };
}

export const Array = {
  encode(message: Array, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.element) {
      Array_Element.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Array {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseArray();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.element.push(Array_Element.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Array {
    return { element: Array.isArray(object?.element) ? object.element.map((e: any) => Array_Element.fromJSON(e)) : [] };
  },

  toJSON(message: Array): unknown {
    const obj: any = {};
    if (message.element?.length) {
      obj.element = message.element.map((e) => Array_Element.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Array>, I>>(base?: I): Array {
    return Array.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Array>, I>>(object: I): Array {
    const message = createBaseArray();
    message.element = object.element?.map((e) => Array_Element.fromPartial(e)) || [];
    return message;
  },
};

function createBaseArray_Element(): Array_Element {
  return { source: undefined, comment: "", item: undefined };
}

export const Array_Element = {
  encode(message: Array_Element, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.source !== undefined) {
      Source.encode(message.source, writer.uint32(10).fork()).ldelim();
    }
    if (message.comment !== "") {
      writer.uint32(18).string(message.comment);
    }
    if (message.item !== undefined) {
      Item.encode(message.item, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Array_Element {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseArray_Element();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.source = Source.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.comment = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.item = Item.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Array_Element {
    return {
      source: isSet(object.source) ? Source.fromJSON(object.source) : undefined,
      comment: isSet(object.comment) ? String(object.comment) : "",
      item: isSet(object.item) ? Item.fromJSON(object.item) : undefined,
    };
  },

  toJSON(message: Array_Element): unknown {
    const obj: any = {};
    if (message.source !== undefined) {
      obj.source = Source.toJSON(message.source);
    }
    if (message.comment !== "") {
      obj.comment = message.comment;
    }
    if (message.item !== undefined) {
      obj.item = Item.toJSON(message.item);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Array_Element>, I>>(base?: I): Array_Element {
    return Array_Element.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Array_Element>, I>>(object: I): Array_Element {
    const message = createBaseArray_Element();
    message.source = (object.source !== undefined && object.source !== null)
      ? Source.fromPartial(object.source)
      : undefined;
    message.comment = object.comment ?? "";
    message.item = (object.item !== undefined && object.item !== null) ? Item.fromPartial(object.item) : undefined;
    return message;
  },
};

function createBasePlural(): Plural {
  return { entry: [] };
}

export const Plural = {
  encode(message: Plural, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.entry) {
      Plural_Entry.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Plural {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePlural();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.entry.push(Plural_Entry.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Plural {
    return { entry: Array.isArray(object?.entry) ? object.entry.map((e: any) => Plural_Entry.fromJSON(e)) : [] };
  },

  toJSON(message: Plural): unknown {
    const obj: any = {};
    if (message.entry?.length) {
      obj.entry = message.entry.map((e) => Plural_Entry.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Plural>, I>>(base?: I): Plural {
    return Plural.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Plural>, I>>(object: I): Plural {
    const message = createBasePlural();
    message.entry = object.entry?.map((e) => Plural_Entry.fromPartial(e)) || [];
    return message;
  },
};

function createBasePlural_Entry(): Plural_Entry {
  return { source: undefined, comment: "", arity: 0, item: undefined };
}

export const Plural_Entry = {
  encode(message: Plural_Entry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.source !== undefined) {
      Source.encode(message.source, writer.uint32(10).fork()).ldelim();
    }
    if (message.comment !== "") {
      writer.uint32(18).string(message.comment);
    }
    if (message.arity !== 0) {
      writer.uint32(24).int32(message.arity);
    }
    if (message.item !== undefined) {
      Item.encode(message.item, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Plural_Entry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePlural_Entry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.source = Source.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.comment = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.arity = reader.int32() as any;
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.item = Item.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Plural_Entry {
    return {
      source: isSet(object.source) ? Source.fromJSON(object.source) : undefined,
      comment: isSet(object.comment) ? String(object.comment) : "",
      arity: isSet(object.arity) ? plural_ArityFromJSON(object.arity) : 0,
      item: isSet(object.item) ? Item.fromJSON(object.item) : undefined,
    };
  },

  toJSON(message: Plural_Entry): unknown {
    const obj: any = {};
    if (message.source !== undefined) {
      obj.source = Source.toJSON(message.source);
    }
    if (message.comment !== "") {
      obj.comment = message.comment;
    }
    if (message.arity !== 0) {
      obj.arity = plural_ArityToJSON(message.arity);
    }
    if (message.item !== undefined) {
      obj.item = Item.toJSON(message.item);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Plural_Entry>, I>>(base?: I): Plural_Entry {
    return Plural_Entry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Plural_Entry>, I>>(object: I): Plural_Entry {
    const message = createBasePlural_Entry();
    message.source = (object.source !== undefined && object.source !== null)
      ? Source.fromPartial(object.source)
      : undefined;
    message.comment = object.comment ?? "";
    message.arity = object.arity ?? 0;
    message.item = (object.item !== undefined && object.item !== null) ? Item.fromPartial(object.item) : undefined;
    return message;
  },
};

function createBaseXmlNode(): XmlNode {
  return { element: undefined, text: undefined, source: undefined };
}

export const XmlNode = {
  encode(message: XmlNode, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.element !== undefined) {
      XmlElement.encode(message.element, writer.uint32(10).fork()).ldelim();
    }
    if (message.text !== undefined) {
      writer.uint32(18).string(message.text);
    }
    if (message.source !== undefined) {
      SourcePosition.encode(message.source, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): XmlNode {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseXmlNode();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.element = XmlElement.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.text = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.source = SourcePosition.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): XmlNode {
    return {
      element: isSet(object.element) ? XmlElement.fromJSON(object.element) : undefined,
      text: isSet(object.text) ? String(object.text) : undefined,
      source: isSet(object.source) ? SourcePosition.fromJSON(object.source) : undefined,
    };
  },

  toJSON(message: XmlNode): unknown {
    const obj: any = {};
    if (message.element !== undefined) {
      obj.element = XmlElement.toJSON(message.element);
    }
    if (message.text !== undefined) {
      obj.text = message.text;
    }
    if (message.source !== undefined) {
      obj.source = SourcePosition.toJSON(message.source);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<XmlNode>, I>>(base?: I): XmlNode {
    return XmlNode.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<XmlNode>, I>>(object: I): XmlNode {
    const message = createBaseXmlNode();
    message.element = (object.element !== undefined && object.element !== null)
      ? XmlElement.fromPartial(object.element)
      : undefined;
    message.text = object.text ?? undefined;
    message.source = (object.source !== undefined && object.source !== null)
      ? SourcePosition.fromPartial(object.source)
      : undefined;
    return message;
  },
};

function createBaseXmlElement(): XmlElement {
  return { namespaceDeclaration: [], namespaceUri: "", name: "", attribute: [], child: [] };
}

export const XmlElement = {
  encode(message: XmlElement, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.namespaceDeclaration) {
      XmlNamespace.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.namespaceUri !== "") {
      writer.uint32(18).string(message.namespaceUri);
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    for (const v of message.attribute) {
      XmlAttribute.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.child) {
      XmlNode.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): XmlElement {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseXmlElement();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.namespaceDeclaration.push(XmlNamespace.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.namespaceUri = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.name = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.attribute.push(XmlAttribute.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.child.push(XmlNode.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): XmlElement {
    return {
      namespaceDeclaration: Array.isArray(object?.namespaceDeclaration)
        ? object.namespaceDeclaration.map((e: any) => XmlNamespace.fromJSON(e))
        : [],
      namespaceUri: isSet(object.namespaceUri) ? String(object.namespaceUri) : "",
      name: isSet(object.name) ? String(object.name) : "",
      attribute: Array.isArray(object?.attribute) ? object.attribute.map((e: any) => XmlAttribute.fromJSON(e)) : [],
      child: Array.isArray(object?.child) ? object.child.map((e: any) => XmlNode.fromJSON(e)) : [],
    };
  },

  toJSON(message: XmlElement): unknown {
    const obj: any = {};
    if (message.namespaceDeclaration?.length) {
      obj.namespaceDeclaration = message.namespaceDeclaration.map((e) => XmlNamespace.toJSON(e));
    }
    if (message.namespaceUri !== "") {
      obj.namespaceUri = message.namespaceUri;
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.attribute?.length) {
      obj.attribute = message.attribute.map((e) => XmlAttribute.toJSON(e));
    }
    if (message.child?.length) {
      obj.child = message.child.map((e) => XmlNode.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<XmlElement>, I>>(base?: I): XmlElement {
    return XmlElement.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<XmlElement>, I>>(object: I): XmlElement {
    const message = createBaseXmlElement();
    message.namespaceDeclaration = object.namespaceDeclaration?.map((e) => XmlNamespace.fromPartial(e)) || [];
    message.namespaceUri = object.namespaceUri ?? "";
    message.name = object.name ?? "";
    message.attribute = object.attribute?.map((e) => XmlAttribute.fromPartial(e)) || [];
    message.child = object.child?.map((e) => XmlNode.fromPartial(e)) || [];
    return message;
  },
};

function createBaseXmlNamespace(): XmlNamespace {
  return { prefix: "", uri: "", source: undefined };
}

export const XmlNamespace = {
  encode(message: XmlNamespace, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.prefix !== "") {
      writer.uint32(10).string(message.prefix);
    }
    if (message.uri !== "") {
      writer.uint32(18).string(message.uri);
    }
    if (message.source !== undefined) {
      SourcePosition.encode(message.source, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): XmlNamespace {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseXmlNamespace();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.prefix = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.uri = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.source = SourcePosition.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): XmlNamespace {
    return {
      prefix: isSet(object.prefix) ? String(object.prefix) : "",
      uri: isSet(object.uri) ? String(object.uri) : "",
      source: isSet(object.source) ? SourcePosition.fromJSON(object.source) : undefined,
    };
  },

  toJSON(message: XmlNamespace): unknown {
    const obj: any = {};
    if (message.prefix !== "") {
      obj.prefix = message.prefix;
    }
    if (message.uri !== "") {
      obj.uri = message.uri;
    }
    if (message.source !== undefined) {
      obj.source = SourcePosition.toJSON(message.source);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<XmlNamespace>, I>>(base?: I): XmlNamespace {
    return XmlNamespace.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<XmlNamespace>, I>>(object: I): XmlNamespace {
    const message = createBaseXmlNamespace();
    message.prefix = object.prefix ?? "";
    message.uri = object.uri ?? "";
    message.source = (object.source !== undefined && object.source !== null)
      ? SourcePosition.fromPartial(object.source)
      : undefined;
    return message;
  },
};

function createBaseXmlAttribute(): XmlAttribute {
  return { namespaceUri: "", name: "", value: "", source: undefined, resourceId: 0, compiledItem: undefined };
}

export const XmlAttribute = {
  encode(message: XmlAttribute, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.namespaceUri !== "") {
      writer.uint32(10).string(message.namespaceUri);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.value !== "") {
      writer.uint32(26).string(message.value);
    }
    if (message.source !== undefined) {
      SourcePosition.encode(message.source, writer.uint32(34).fork()).ldelim();
    }
    if (message.resourceId !== 0) {
      writer.uint32(40).uint32(message.resourceId);
    }
    if (message.compiledItem !== undefined) {
      Item.encode(message.compiledItem, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): XmlAttribute {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseXmlAttribute();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.namespaceUri = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.name = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.value = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.source = SourcePosition.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.resourceId = reader.uint32();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.compiledItem = Item.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): XmlAttribute {
    return {
      namespaceUri: isSet(object.namespaceUri) ? String(object.namespaceUri) : "",
      name: isSet(object.name) ? String(object.name) : "",
      value: isSet(object.value) ? String(object.value) : "",
      source: isSet(object.source) ? SourcePosition.fromJSON(object.source) : undefined,
      resourceId: isSet(object.resourceId) ? Number(object.resourceId) : 0,
      compiledItem: isSet(object.compiledItem) ? Item.fromJSON(object.compiledItem) : undefined,
    };
  },

  toJSON(message: XmlAttribute): unknown {
    const obj: any = {};
    if (message.namespaceUri !== "") {
      obj.namespaceUri = message.namespaceUri;
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.value !== "") {
      obj.value = message.value;
    }
    if (message.source !== undefined) {
      obj.source = SourcePosition.toJSON(message.source);
    }
    if (message.resourceId !== 0) {
      obj.resourceId = Math.round(message.resourceId);
    }
    if (message.compiledItem !== undefined) {
      obj.compiledItem = Item.toJSON(message.compiledItem);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<XmlAttribute>, I>>(base?: I): XmlAttribute {
    return XmlAttribute.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<XmlAttribute>, I>>(object: I): XmlAttribute {
    const message = createBaseXmlAttribute();
    message.namespaceUri = object.namespaceUri ?? "";
    message.name = object.name ?? "";
    message.value = object.value ?? "";
    message.source = (object.source !== undefined && object.source !== null)
      ? SourcePosition.fromPartial(object.source)
      : undefined;
    message.resourceId = object.resourceId ?? 0;
    message.compiledItem = (object.compiledItem !== undefined && object.compiledItem !== null)
      ? Item.fromPartial(object.compiledItem)
      : undefined;
    return message;
  },
};

function createBaseMacroBody(): MacroBody {
  return { rawString: "", styleString: undefined, untranslatableSections: [], namespaceStack: [], source: undefined };
}

export const MacroBody = {
  encode(message: MacroBody, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.rawString !== "") {
      writer.uint32(10).string(message.rawString);
    }
    if (message.styleString !== undefined) {
      StyleString.encode(message.styleString, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.untranslatableSections) {
      UntranslatableSection.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.namespaceStack) {
      NamespaceAlias.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.source !== undefined) {
      SourcePosition.encode(message.source, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MacroBody {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMacroBody();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.rawString = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.styleString = StyleString.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.untranslatableSections.push(UntranslatableSection.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.namespaceStack.push(NamespaceAlias.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.source = SourcePosition.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MacroBody {
    return {
      rawString: isSet(object.rawString) ? String(object.rawString) : "",
      styleString: isSet(object.styleString) ? StyleString.fromJSON(object.styleString) : undefined,
      untranslatableSections: Array.isArray(object?.untranslatableSections)
        ? object.untranslatableSections.map((e: any) => UntranslatableSection.fromJSON(e))
        : [],
      namespaceStack: Array.isArray(object?.namespaceStack)
        ? object.namespaceStack.map((e: any) => NamespaceAlias.fromJSON(e))
        : [],
      source: isSet(object.source) ? SourcePosition.fromJSON(object.source) : undefined,
    };
  },

  toJSON(message: MacroBody): unknown {
    const obj: any = {};
    if (message.rawString !== "") {
      obj.rawString = message.rawString;
    }
    if (message.styleString !== undefined) {
      obj.styleString = StyleString.toJSON(message.styleString);
    }
    if (message.untranslatableSections?.length) {
      obj.untranslatableSections = message.untranslatableSections.map((e) => UntranslatableSection.toJSON(e));
    }
    if (message.namespaceStack?.length) {
      obj.namespaceStack = message.namespaceStack.map((e) => NamespaceAlias.toJSON(e));
    }
    if (message.source !== undefined) {
      obj.source = SourcePosition.toJSON(message.source);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MacroBody>, I>>(base?: I): MacroBody {
    return MacroBody.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MacroBody>, I>>(object: I): MacroBody {
    const message = createBaseMacroBody();
    message.rawString = object.rawString ?? "";
    message.styleString = (object.styleString !== undefined && object.styleString !== null)
      ? StyleString.fromPartial(object.styleString)
      : undefined;
    message.untranslatableSections = object.untranslatableSections?.map((e) => UntranslatableSection.fromPartial(e)) ||
      [];
    message.namespaceStack = object.namespaceStack?.map((e) => NamespaceAlias.fromPartial(e)) || [];
    message.source = (object.source !== undefined && object.source !== null)
      ? SourcePosition.fromPartial(object.source)
      : undefined;
    return message;
  },
};

function createBaseNamespaceAlias(): NamespaceAlias {
  return { prefix: "", packageName: "", isPrivate: false };
}

export const NamespaceAlias = {
  encode(message: NamespaceAlias, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.prefix !== "") {
      writer.uint32(10).string(message.prefix);
    }
    if (message.packageName !== "") {
      writer.uint32(18).string(message.packageName);
    }
    if (message.isPrivate === true) {
      writer.uint32(24).bool(message.isPrivate);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NamespaceAlias {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNamespaceAlias();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.prefix = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.packageName = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.isPrivate = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): NamespaceAlias {
    return {
      prefix: isSet(object.prefix) ? String(object.prefix) : "",
      packageName: isSet(object.packageName) ? String(object.packageName) : "",
      isPrivate: isSet(object.isPrivate) ? Boolean(object.isPrivate) : false,
    };
  },

  toJSON(message: NamespaceAlias): unknown {
    const obj: any = {};
    if (message.prefix !== "") {
      obj.prefix = message.prefix;
    }
    if (message.packageName !== "") {
      obj.packageName = message.packageName;
    }
    if (message.isPrivate === true) {
      obj.isPrivate = message.isPrivate;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<NamespaceAlias>, I>>(base?: I): NamespaceAlias {
    return NamespaceAlias.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<NamespaceAlias>, I>>(object: I): NamespaceAlias {
    const message = createBaseNamespaceAlias();
    message.prefix = object.prefix ?? "";
    message.packageName = object.packageName ?? "";
    message.isPrivate = object.isPrivate ?? false;
    return message;
  },
};

function createBaseStyleString(): StyleString {
  return { str: "", spans: [] };
}

export const StyleString = {
  encode(message: StyleString, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.str !== "") {
      writer.uint32(10).string(message.str);
    }
    for (const v of message.spans) {
      StyleString_Span.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StyleString {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStyleString();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.str = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.spans.push(StyleString_Span.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StyleString {
    return {
      str: isSet(object.str) ? String(object.str) : "",
      spans: Array.isArray(object?.spans) ? object.spans.map((e: any) => StyleString_Span.fromJSON(e)) : [],
    };
  },

  toJSON(message: StyleString): unknown {
    const obj: any = {};
    if (message.str !== "") {
      obj.str = message.str;
    }
    if (message.spans?.length) {
      obj.spans = message.spans.map((e) => StyleString_Span.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StyleString>, I>>(base?: I): StyleString {
    return StyleString.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<StyleString>, I>>(object: I): StyleString {
    const message = createBaseStyleString();
    message.str = object.str ?? "";
    message.spans = object.spans?.map((e) => StyleString_Span.fromPartial(e)) || [];
    return message;
  },
};

function createBaseStyleString_Span(): StyleString_Span {
  return { name: "", startIndex: 0, endIndex: 0 };
}

export const StyleString_Span = {
  encode(message: StyleString_Span, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.startIndex !== 0) {
      writer.uint32(16).uint32(message.startIndex);
    }
    if (message.endIndex !== 0) {
      writer.uint32(24).uint32(message.endIndex);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StyleString_Span {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStyleString_Span();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.startIndex = reader.uint32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.endIndex = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StyleString_Span {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      startIndex: isSet(object.startIndex) ? Number(object.startIndex) : 0,
      endIndex: isSet(object.endIndex) ? Number(object.endIndex) : 0,
    };
  },

  toJSON(message: StyleString_Span): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.startIndex !== 0) {
      obj.startIndex = Math.round(message.startIndex);
    }
    if (message.endIndex !== 0) {
      obj.endIndex = Math.round(message.endIndex);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StyleString_Span>, I>>(base?: I): StyleString_Span {
    return StyleString_Span.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<StyleString_Span>, I>>(object: I): StyleString_Span {
    const message = createBaseStyleString_Span();
    message.name = object.name ?? "";
    message.startIndex = object.startIndex ?? 0;
    message.endIndex = object.endIndex ?? 0;
    return message;
  },
};

function createBaseUntranslatableSection(): UntranslatableSection {
  return { startIndex: 0, endIndex: 0 };
}

export const UntranslatableSection = {
  encode(message: UntranslatableSection, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.startIndex !== 0) {
      writer.uint32(8).uint64(message.startIndex);
    }
    if (message.endIndex !== 0) {
      writer.uint32(16).uint64(message.endIndex);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UntranslatableSection {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUntranslatableSection();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.startIndex = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.endIndex = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UntranslatableSection {
    return {
      startIndex: isSet(object.startIndex) ? Number(object.startIndex) : 0,
      endIndex: isSet(object.endIndex) ? Number(object.endIndex) : 0,
    };
  },

  toJSON(message: UntranslatableSection): unknown {
    const obj: any = {};
    if (message.startIndex !== 0) {
      obj.startIndex = Math.round(message.startIndex);
    }
    if (message.endIndex !== 0) {
      obj.endIndex = Math.round(message.endIndex);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UntranslatableSection>, I>>(base?: I): UntranslatableSection {
    return UntranslatableSection.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UntranslatableSection>, I>>(object: I): UntranslatableSection {
    const message = createBaseUntranslatableSection();
    message.startIndex = object.startIndex ?? 0;
    message.endIndex = object.endIndex ?? 0;
    return message;
  },
};

declare const self: any | undefined;
declare const window: any | undefined;
declare const global: any | undefined;
const tsProtoGlobalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

function bytesFromBase64(b64: string): Uint8Array {
  if (tsProtoGlobalThis.Buffer) {
    return Uint8Array.from(tsProtoGlobalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = tsProtoGlobalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if (tsProtoGlobalThis.Buffer) {
    return tsProtoGlobalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(String.fromCharCode(byte));
    });
    return tsProtoGlobalThis.btoa(bin.join(""));
  }
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new tsProtoGlobalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
