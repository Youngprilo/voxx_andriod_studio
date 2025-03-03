import {
  PAnimatedImage
} from "./chunk.ONPYOAQU.js";

// src/react/animated-image/index.ts
import * as React from "react";
import { createComponent } from "@lit/react";
import "@lit/react";
var tagName = "p-animated-image";
PAnimatedImage.define("p-animated-image");
var reactWrapper = createComponent({
  tagName,
  elementClass: PAnimatedImage,
  react: React,
  events: {
    onPLoad: "p-load",
    onPError: "p-error"
  },
  displayName: "PAnimatedImage"
});
var animated_image_default = reactWrapper;

export {
  animated_image_default
};
