/// <reference path="./index.d.ts" />

const property = (key: string | number, ...children: any) =>
    jsonxobject({
        [key]: jsonx(null, {children}),
    });

export class JSONXObject extends Object {}
const jsonxobject = (obj: any) => Object.assign(new JSONXObject(), obj);

const fragment = (...children: any[]) =>
    children.length > 1
        ? children.some((child) => child instanceof JSONXObject)
            ? jsonxobject(
                  children
                      .filter((child) => child instanceof JSONXObject)
                      .concat(
                          children
                              .filter(
                                  (child) => !(child instanceof JSONXObject),
                              )
                              .map((value, i) => {
                                  return {[i]: value};
                              }),
                      )
                      .reduce((a, b) => {
                          return {...a, ...b};
                      }, {}),
              )
            : children
        : children[0];

export const plain = (obj: any): any =>
    Array.isArray(obj)
        ? obj.map((item) => plain(item))
        : obj instanceof JSONXObject
          ? Object.fromEntries(
                Object.entries(obj).map(([key, value]) => [key, plain(value)]),
            )
          : obj;

const wrapChildren = (props: any, children: any) =>
    props && 'children' in props
        ? Array.isArray(props?.children)
            ? props.children
            : [props.children]
        : children;

export const jsonx = (t: any, props: any, ...children: any[]): any =>
    !t
        ? fragment(...wrapChildren(props, children))
        : t === 'prop'
          ? property(props.key, ...wrapChildren(props, children))
          : t === 'array'
            ? wrapChildren(props, children)
            : t === 'item'
              ? wrapChildren(props, children)[0]
              : t === 'plain'
                ? plain(wrapChildren(props, children)[0])
                : property(t, ...wrapChildren(props, children));
