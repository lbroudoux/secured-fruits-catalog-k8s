import { Observable, BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";

/**
 * A simple User model representing application user.
 */
export class User {
  login: string;
  id: number;
  name: string;
  email: string;
  avatar: string;

  constructor() {
    this.login = "";
    this.name = "";
    this.email = "";
  }
};

/**
 * A version of the authentication service that uses keycloak.js to provide
 * authentication services.
 */
export class AuthenticationService {

  private _authenticated: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public authenticated: Observable<boolean> = this._authenticated.asObservable();

  private _authenticatedUser: BehaviorSubject<User> = new BehaviorSubject(null);
  public authenticatedUser: Observable<User> = this._authenticatedUser.asObservable();

  private keycloak: any;

  /**
   * Constructor.
   * @param http
   */
  constructor(private http: HttpClient) {
    let w: any = window;
    this.keycloak = w["keycloak"];

    //console.info("Token: %s", JSON.stringify(this.keycloak.tokenParsed, null, 2));
    //console.info("ID Token: %s", JSON.stringify(this.keycloak.idTokenParsed, null, 2));
    //console.info("Access Token: %s", this.keycloak.token);

    let user: User = new User();
    user.name = this.keycloak.tokenParsed.name;
    user.login = this.keycloak.tokenParsed.preferred_username;
    user.email = this.keycloak.tokenParsed.email;

    this._authenticated.next(true);
    this._authenticatedUser.next(user);

    // Periodically refresh
    // TODO run this outsize NgZone using zone.runOutsideAngular() : https://angular.io/api/core/NgZone
    setInterval(() => {
      this.keycloak.updateToken(30);
    }, 30000);
  }

  /** Returns the observable for is/isnot authenticated. */
  public isAuthenticated(): Observable<boolean> {
    return this.authenticated;
  }

  /** Returns an observable over the currently authenticated User (or null if not logged in). */
  public getAuthenticatedUser(): Observable<User> {
    return this.authenticatedUser;
  }

  /** Returns the currently authenticated user. */
  public getAuthenticatedUserNow(): User {
    return this._authenticatedUser.getValue();
  }

  /**
   * Called to check that user can endorse a role.
   * @param role 
   */
  public hasRole(role: string): boolean {
    //console.log("[KeycloakAuthenticationService] hasRealmRole called with " + role);
    return this.keycloak.hasRealmRole(role);
  }

  /**
   * Call to check that user can endorse role for a specific resource.
   * @param role 
   * @param resource 
   */
  public hasRoleForResource(role: string, resource: string): boolean {
    return false;
  }

  /** Logout. */
  public logout(): void {
    this.keycloak.logout({ redirectUri: location.href });
  }

  /**
   * Called to inject authentication headers into a remote API call.
   * @param headers
   */
  public injectAuthHeaders(headers: { [header: string]: string }): void {
    let authHeader: string = "Bearer " + this.keycloak.token;
    headers["Authorization"] = authHeader;
  }

  /** Called to return the keycloak access token. */
  public getAuthenticationSecret(): string {
    return this.keycloak.token;
  }
};

export function AuthenticationServiceFactory(http: HttpClient): AuthenticationService {
  console.info("[AuthenticationServiceFactory] Creating AuthenticationService...");
  return new AuthenticationService(http);
};

export let AuthenticationServiceProvider =
{
  provide: AuthenticationService,
  useFactory: AuthenticationServiceFactory,
  deps: [HttpClient]
};