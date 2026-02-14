import { createId } from "@paralleldrive/cuid2";
import DOMPurify from "dompurify";

import type { DynamicDnDItemType } from "@/types/drag-n-drop";

import { GENERAL } from "@/constants/general";

/* eslint-disable regexp/no-unused-capturing-group */
const AZURE_URL = import.meta.env.VITE_AZURE_URL;

export function imgURL(originalPath: string | null, size: string | null = null): string {
  if (originalPath === String(undefined) || originalPath == null) {
    return "/";
  }

  if (originalPath && originalPath?.startsWith("data:image"))
    return originalPath;

  const baseURL = localStorage.getItem("base_url")
    ? localStorage.getItem("base_url")
    : AZURE_URL;
  let image_url = "";

  if (isfullUrl(originalPath)) {
    return originalPath;
  }
  else if (originalPath !== null) {
    if (size != null) {
      image_url
        = originalPath !== String(undefined) && originalPath.startsWith("/")
          ? `${baseURL}/${size}${originalPath}`
          : `${baseURL}/${size}/${originalPath}`;
    }
    else {
      image_url
        = originalPath !== String(undefined) && originalPath.startsWith("/")
          ? baseURL + originalPath
          : `${baseURL}/${size}/${originalPath}`;
    }
  }
  else {
    if (size != null) {
      image_url = `${baseURL}/${size}/${originalPath}`;
    }
    else {
      image_url = baseURL + originalPath;
    }
  }
  return image_url;
}

function isfullUrl(originalPath: string) {
  const matchpattern
    = /^https?:\/\/(?:www\.)?[-\w@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-\w()@:%+.~#?&/=]*)$/gm;
  return matchpattern.test(originalPath);
}

function locationManager(locationsForDropdowns?: any[]): { states: any[]; districts: any[]; cities: any[]; findByParent: (parent_id: number, child: any[]) => any[] } {
  const states: any[] = [];
  const districts: any[] = [];
  const cities: any[] = [];

  const returnObj = {
    states,
    districts,
    cities,
    findByParent,
  };

  if (!locationsForDropdowns) {
    return returnObj;
  }

  locationsForDropdowns.forEach((each: any) => {
    if (each.type === 2) {
      states.push({ ...each, id: each.id.toString() });
    }
    else if (each.type === 3) {
      districts.push({ ...each, id: each.id.toString() });
    }
    else if (each.type !== 1 && each.type !== 2 && each.type !== 3) {
      cities.push({ ...each, id: each.id.toString() });
    }
  });

  function findByParent(id: number, child: any[]) {
    const filteredChild = [...child].filter(c => c.parent_id === id);
    return filteredChild;
  }

  return returnObj;
}

function hydrateForm(data: any) {
  const tmpData = { ...data };

  Object.entries(tmpData).forEach(([key, value]) => {
    if ((!value || key === "password") && typeof value !== "boolean") {
      tmpData[key] = "";
    }
    if (typeof value === "number") {
      tmpData[key] = value.toString();
    }
  });
  return tmpData;
}

function cleanForm(data: any) {
  const tmpData = { ...data };

  Object.entries(tmpData).forEach(([key, value]) => {
    if (value === GENERAL.FILTER_OFF) {
      tmpData[key] = "";
    }
  });

  return tmpData;
}

function hydrateDropDown(data: any[]): any[] {
  const tmpData: any[] = [];

  if (data && data.length > 0) {
    data.forEach((data) => {
      const newData = hydrateForm(data);
      tmpData.push(newData);
    });
  }

  return tmpData;
}

function countFilter<TValues extends Record<string, any>>(defaultValues: TValues, values: TValues, ignoreArr?: string[]) {
  let count: number = 0;
  Object.entries(values).forEach(([key, value]) => {
    if (value) {
      if (ignoreArr && ignoreArr.includes(key)) {
        return;
      }
      if (Array.isArray(value) && value.length <= 0)
        return;
      if (defaultValues[key] === value)
        return;
      if (value === GENERAL.FILTER_OFF)
        return;
      count++;
    }
  });
  return count;
}

function cleanFILTER_OFF(value: string) {
  if (value === GENERAL.FILTER_OFF) {
    return "";
  }
  return value;
}

function createSlug(title: string) {
  return title.toLowerCase().replace(/\s+/g, "-");
}

function stripHtmlTags(htmlString: string): string {
  // 1. Sanitize the HTML string (removes potentially dangerous attributes/tags)
  const sanitizedHtml = DOMPurify.sanitize(htmlString);

  // 2. Use a temporary element to safely extract the text content
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = sanitizedHtml;

  // 3. Return the plain text
  return tempDiv.textContent || tempDiv.textContent || "";
}

function getPreviewText(htmlString: string, limit: number = 450): string {
  // 1. Strip all HTML tags to get clean plain text
  // (Assuming DataUtils.stripHtmlTags is equivalent to the safe stripping logic)
  const plainText = stripHtmlTags(htmlString);

  // 2. Remove extra whitespace (optional, but makes previews cleaner)
  const cleanedText = plainText.trim().replace(/\s+/g, " ");

  // 3. Truncate the string
  if (cleanedText.length <= limit) {
    return cleanedText;
  }

  // Find the last space before the limit to avoid cutting a word in half
  const truncatedText = cleanedText.substring(0, limit);
  const lastSpaceIndex = truncatedText.lastIndexOf(" ");

  if (lastSpaceIndex > 0) {
    // Return text truncated at the last full word, plus ellipsis
    return `${truncatedText.substring(0, lastSpaceIndex)}...`;
  }

  // Fallback: just cut at the character limit and add ellipsis
  return `${truncatedText}...`;
}

function figureOutTypes(dataArray: any[], videos: any[]): DynamicDnDItemType[] {
  const results = dataArray.map((item) => {
    // Use typeof for the general type check
    // const basicType = typeof item;

    // If it's not a string, return its basic type
    // if (basicType !== "string") {
    //   return { id: createId(), name: "VideoUrl", content: item };
    // }

    // --- Specific String Classification ---

    // 1. Check for Video File Extension (e.g., .mp4, .mov)
    if (item.endsWith(".mp4") || item.endsWith(".avi") || item.endsWith(".webm") || item.endsWith(".mpg") || item.endsWith(".mpeg")) {
      const targetVideo = videos.find(video => video.video === item);
      return { id: createId(), name: "Video", content: { video: item, posterImage: targetVideo ? targetVideo?.poster : null } };
    }

    if (item?.poster) {
      return { id: createId(), name: "Video", content: { poster: item.poster, video: item.video } };
    }

    // 2. Check for Image File Extension (e.g., .jpg, .png, .gif)
    if (item.endsWith(".jpg") || item.endsWith(".jpeg") || item.endsWith(".png") || item.endsWith(".gif") || item.endsWith(".webp")) {
      return { id: createId(), name: "Image", content: item };
    }

    // 3. Check for HTML content (e.g., starting with '<' and containing common tags)
    if (item.startsWith("<") && item.endsWith(">") && (item.includes("<p>") || item.includes("<div>"))) {
      return { id: createId(), name: "Text", content: item };
    }

    // 4. Default to General String
    return { id: createId(), name: "VideoUrl", content: item };
  });

  return results;
}

export const dataUtils = {
  imgURL,
  isfullUrl,
  locationManager,
  hydrateForm,
  hydrateDropDown,
  cleanForm,
  countFilter,
  cleanFILTER_OFF,
  createSlug,
  stripHtmlTags,
  getPreviewText,
  figureOutTypes,
};
