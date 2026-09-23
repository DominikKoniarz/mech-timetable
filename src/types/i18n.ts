import type {
    Formats,
    ICUArgs,
    Messages,
    NestedValueOf,
    useTranslations,
} from "next-intl";

type ObjectKeysInObject<T> = T extends object
    ? {
          [K in string & keyof T]: T[K] extends object
              ? K | `${K & string}.${ObjectKeysInObject<T[K]>}`
              : never;
      }[string & keyof T]
    : never;

type Namespaces = ObjectKeysInObject<Messages>;

type Translate<Namespace extends Namespaces = never> = ReturnType<
    typeof useTranslations<Namespace>
>;

type NamespaceKeys<Namespace extends Namespaces> = Parameters<
    Translate<Namespace>
>[0];

type ICUArgsOf<Value extends string> = ICUArgs<
    Value,
    {
        ICUArgument: string;
        ICUNumberArgument: number | bigint;
        ICUDateArgument: Date;
    }
>;

type OnlyOptional<T> = Partial<T> extends T ? true : false;

type TranslateArgs<Value extends string> = string extends Value
    ? [values?: Record<string, string | number | Date>, formats?: Formats]
    : (Value extends string ? (key: ICUArgsOf<Value>) => void : never) extends (
            key: infer Args,
        ) => void
      ? OnlyOptional<Args> extends true
          ? [values?: undefined, formats?: Formats]
          : [values: { [K in keyof Args]: Args[K] }, formats?: Formats]
      : never;

export type TFunction<Namespace extends Namespaces = never> = {
    <Key extends string>(
        key: Key & NamespaceKeys<Namespace>,
        ...args: NestedValueOf<
            Messages,
            `${Namespace}.${Key}`
        > extends infer Value extends string
            ? TranslateArgs<Value>
            : never
    ): string;
};
