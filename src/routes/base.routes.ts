import type { Express } from "express";
import BaseControllers from "../controllers/base.controllers";
import { API_URL } from "../shared/constant/app.constant";

/**
 * BaseRoutes is an abstract class that provides a base implementation for routes in the application.
 * Subclasses of BaseRoutes should implement the router, controller, and runRoutes methods.
 */
abstract class BaseRoutes {
  protected abstract readonly router: Express;
  private _routeMainUrl: string = API_URL;
  protected abstract readonly controller: BaseControllers;
  protected abstract readonly validations: unknown;

  protected get routeMainUrl(): string {
    return this._routeMainUrl;
  }

  /**
   * Constructs a new instance of the BaseRoutes class.
   * @param url The URL to be used for the route.
   */
  constructor(url?: string) {
    if (url) this._routeMainUrl = this.generateSanitizedRouteUrl(url);
  }

  protected abstract runRoutes(): void;

  /**
   * Generates a sanitized route URL by appending the provided URL to the main route URL,
   * converting it to lowercase, replacing spaces with hyphens, and removing duplicate slashes.
   * Ensures that the URL ends with a trailing slash and starts with a leading slash.
   *
   * @param url - The URL to be sanitized and appended to the main route URL.
   * @returns The sanitized route URL.
   */
  protected generateSanitizedRouteUrl = (url: string): string => {
    url = `${this.routeMainUrl}/${url}`;
    url = url.toLowerCase().replace(" ", "-").replace("//", "/");
    if (!url.endsWith("/")) url = `${url}/`;
    if (!url.startsWith("/")) url = `/${url}`;

    return url;
  };
}

export default BaseRoutes;
