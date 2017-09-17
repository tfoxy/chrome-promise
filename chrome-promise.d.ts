// Type definitions for chrome-promise
// Project: https://github.com/tfoxy/chrome-promise
// Definitions by: Tomás Fox <https://github.com/tfoxy>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
export default class ChromePromise {
    constructor(options?: {
            chrome?: object;
            Promise?: Function;
        });
    accessibilityFeatures: chromepApi.AccessibilityFeatures;
    alarms: chromepApi.Alarms;
    browser: chromepApi.Browser;
    bookmarks: chromepApi.Bookmarks;
    browserAction: chromepApi.BrowserAction;
    browsingData: chromepApi.BrowsingData;
    commands: chromepApi.Commands;
    contentSettings: chromepApi.ContentSettings;
    contextMenus: chromepApi.ContextMenus;
    cookies: chromepApi.Cookies;
    declarativeContent: chromepApi.DeclarativeContent;
    declarativeWebRequest: chromepApi.DeclarativeWebRequest;
    desktopCapture: chromepApi.DesktopCapture;
    documentScan: chromepApi.DocumentScan;
    downloads: chromepApi.Downloads;
    events: chromepApi.Events;
    extension: chromepApi.Extension;
    fileBrowserHandler: chromepApi.FileBrowserHandler;
    fileSystemProvider: chromepApi.FileSystemProvider;
    fontSettings: chromepApi.FontSettings;
    gcm: chromepApi.Gcm;
    history: chromepApi.History;
    i18n: chromepApi.I18n;
    identity: chromepApi.Identity;
    idle: chromepApi.Idle;
    management: chromepApi.Management;
    notifications: chromepApi.Notifications;
    omnibox: chromepApi.Omnibox;
    pageAction: chromepApi.PageAction;
    pageCapture: chromepApi.PageCapture;
    permissions: chromepApi.Permissions;
    platformKeys: chromepApi.PlatformKeys;
    power: chromepApi.Power;
    printerProvider: chromepApi.PrinterProvider;
    privacy: chromepApi.Privacy;
    proxy: chromepApi.Proxy;
    runtime: chromepApi.Runtime;
    scriptBadge: chromepApi.ScriptBadge;
    sessions: chromepApi.Sessions;
    storage: chromepApi.Storage;
    socket: chromepApi.Socket;
    tabCapture: chromepApi.TabCapture;
    tabs: chromepApi.Tabs;
    topSites: chromepApi.TopSites;
    tts: chromepApi.Tts;
    ttsEngine: chromepApi.TtsEngine;
    types: chromepApi.Types;
    vpnProvider: chromepApi.VpnProvider;
    wallpaper: chromepApi.Wallpaper;
    webNavigation: chromepApi.WebNavigation;
    webRequest: chromepApi.WebRequest;
    webstore: chromepApi.Webstore;
    windows: chromepApi.Windows;
}
declare namespace chromepApi {
    /**
     * Use the chrome.accessibilityFeatures API to manage Chrome's accessibility features. This API relies on the ChromeSetting prototype of the type API for getting and setting individual accessibility features. In order to get feature states the extension must request accessibilityFeatures.read permission. For modifying feature state, the extension needs accessibilityFeatures.modify permission. Note that accessibilityFeatures.modify does not imply accessibilityFeatures.read permission.
     * Availability: Since Chrome 37.
     * Permissions: "accessibilityFeatures.read"
     * Important: This API works only on Chrome OS.
     */
    export interface AccessibilityFeatures {
    }
    /**
     * Use the chrome.alarms API to schedule code to run periodically or at a specified time in the future.
     * Availability: Since Chrome 22.
     * Permissions:  "alarms"
     */
    export interface Alarms {
        /**
             * Gets an array of all the alarms.
             * @param callback The callback parameter should be a function that looks like this:
             * function(array of Alarm alarms) {...};
             */
        getAll(): Promise<chrome.alarms.Alarm[]>;
        /**
             * Clears all alarms.
             * @param callback If you specify the callback parameter, it should be a function that looks like this:
             * function(boolean wasCleared) {...};
             */
        clearAll(): Promise<boolean>;
        /**
             * Clears the alarm with the given name.
             * @param name The name of the alarm to clear. Defaults to the empty string.
             * @param callback If you specify the callback parameter, it should be a function that looks like this:
             * function(boolean wasCleared) {...};
             */
        clear(name?: string): Promise<boolean>;
        /**
             * Clears the alarm without a name.
             * @param callback If you specify the callback parameter, it should be a function that looks like this:
             * function(boolean wasCleared) {...};
             */
        clear(): Promise<boolean>;
        /**
             * Retrieves details about the specified alarm.
             * @param callback The callback parameter should be a function that looks like this:
             * function( Alarm alarm) {...};
             */
        get(): Promise<chrome.alarms.Alarm>;
        /**
             * Retrieves details about the specified alarm.
             * @param name The name of the alarm to get. Defaults to the empty string.
             * @param callback The callback parameter should be a function that looks like this:
             * function( Alarm alarm) {...};
             */
        get(name: string): Promise<chrome.alarms.Alarm>;
    }
    /**
     * Use the chrome.browser API to interact with the Chrome browser associated with
     * the current application and Chrome profile.
     */
    export interface Browser {
        /**
             * Opens a new tab in a browser window associated with the current application
             * and Chrome profile. If no browser window for the Chrome profile is opened,
             * a new one is opened prior to creating the new tab.
             * @param options Configures how the tab should be opened.
             * @param callback Called when the tab was successfully
             * created, or failed to be created. If failed, runtime.lastError will be set.
             */
        openTab(options: chrome.browser.Options): Promise<void>;
    }
    /**
     * Use the chrome.bookmarks API to create, organize, and otherwise manipulate bookmarks. Also see Override Pages, which you can use to create a custom Bookmark Manager page.
     * Availability: Since Chrome 5.
     * Permissions:  "bookmarks"
     */
    export interface Bookmarks {
        /**
             * Searches for BookmarkTreeNodes matching the given query. Queries specified with an object produce BookmarkTreeNodes matching all specified properties.
             * @param query A string of words and quoted phrases that are matched against bookmark URLs and titles.
             * @param callback The callback parameter should be a function that looks like this:
             * function(array of BookmarkTreeNode results) {...};
             */
        search(query: string): Promise<chrome.bookmarks.BookmarkTreeNode[]>;
        /**
             * Searches for BookmarkTreeNodes matching the given query. Queries specified with an object produce BookmarkTreeNodes matching all specified properties.
             * @param query An object with one or more of the properties query, url, and title specified. Bookmarks matching all specified properties will be produced.
             * @param callback The callback parameter should be a function that looks like this:
             * function(array of BookmarkTreeNode results) {...};
             */
        search(query: chrome.bookmarks.BookmarkSearchQuery): Promise<chrome.bookmarks.BookmarkTreeNode[]>;
        /**
             * Retrieves the entire Bookmarks hierarchy.
             * @param callback The callback parameter should be a function that looks like this:
             * function(array of BookmarkTreeNode results) {...};
             */
        getTree(): Promise<chrome.bookmarks.BookmarkTreeNode[]>;
        /**
             * Retrieves the recently added bookmarks.
             * @param numberOfItems The maximum number of items to return.
             * @param callback The callback parameter should be a function that looks like this:
             * function(array of BookmarkTreeNode results) {...};
             */
        getRecent(numberOfItems: number): Promise<chrome.bookmarks.BookmarkTreeNode[]>;
        /**
             * Retrieves the specified BookmarkTreeNode.
             * @param id A single string-valued id
             * @param callback The callback parameter should be a function that looks like this:
             * function(array of BookmarkTreeNode results) {...};
             */
        get(id: string): Promise<chrome.bookmarks.BookmarkTreeNode[]>;
        /**
             * Retrieves the specified BookmarkTreeNode.
             * @param idList An array of string-valued ids
             * @param callback The callback parameter should be a function that looks like this:
             * function(array of BookmarkTreeNode results) {...};
             */
        get(idList: string[]): Promise<chrome.bookmarks.BookmarkTreeNode[]>;
        /**
             * Creates a bookmark or folder under the specified parentId. If url is NULL or missing, it will be a folder.
             * @param callback If you specify the callback parameter, it should be a function that looks like this:
             * function( BookmarkTreeNode result) {...};
             */
        create(bookmark: chrome.bookmarks.BookmarkCreateArg): Promise<chrome.bookmarks.BookmarkTreeNode>;
        /**
             * Moves the specified BookmarkTreeNode to the provided location.
             * @param callback If you specify the callback parameter, it should be a function that looks like this:
             * function( BookmarkTreeNode result) {...};
             */
        move(id: string, destination: chrome.bookmarks.BookmarkDestinationArg): Promise<chrome.bookmarks.BookmarkTreeNode>;
        /**
             * Updates the properties of a bookmark or folder. Specify only the properties that you want to change; unspecified properties will be left unchanged. Note: Currently, only 'title' and 'url' are supported.
             * @param callback If you specify the callback parameter, it should be a function that looks like this:
             * function( BookmarkTreeNode result) {...};
             */
        update(id: string, changes: chrome.bookmarks.BookmarkChangesArg): Promise<chrome.bookmarks.BookmarkTreeNode>;
        /**
             * Removes a bookmark or an empty bookmark folder.
             * @param callback If you specify the callback parameter, it should be a function that looks like this:
             * function() {...};
             */
        remove(id: string): Promise<void>;
        /**
             * Retrieves the children of the specified BookmarkTreeNode id.
             * @param callback The callback parameter should be a function that looks like this:
             * function(array of BookmarkTreeNode results) {...};
             */
        getChildren(id: string): Promise<chrome.bookmarks.BookmarkTreeNode[]>;
        /**
             * Since Chrome 14.
             * Retrieves part of the Bookmarks hierarchy, starting at the specified node.
             * @param id The ID of the root of the subtree to retrieve.
             * @param callback The callback parameter should be a function that looks like this:
             * function(array of BookmarkTreeNode results) {...};
             */
        getSubTree(id: string): Promise<chrome.bookmarks.BookmarkTreeNode[]>;
        /**
             * Recursively removes a bookmark folder.
             * @param callback If you specify the callback parameter, it should be a function that looks like this:
             * function() {...};
             */
        removeTree(id: string): Promise<void>;
    }
    /**
     * Use browser actions to put icons in the main Google Chrome toolbar, to the right of the address bar. In addition to its icon, a browser action can also have a tooltip, a badge, and a popup.
     * Availability: Since Chrome 5.
     * Manifest:  "browser_action": {...}
     */
    export interface BrowserAction {
        /**
             * Since Chrome 19.
             * Gets the badge text of the browser action. If no tab is specified, the non-tab-specific badge text is returned.
             * @param callback The callback parameter should be a function that looks like this:
             * function(string result) {...};
             */
        getBadgeText(details: chrome.browserAction.TabDetails): Promise<string>;
        /**
             * Since Chrome 19.
             * Gets the title of the browser action.
             * @param callback The callback parameter should be a function that looks like this:
             * function(string result) {...};
             */
        getTitle(details: chrome.browserAction.TabDetails): Promise<string>;
        /**
             * Since Chrome 19.
             * Gets the background color of the browser action.
             * @param callback The callback parameter should be a function that looks like this:
             * function( ColorArray result) {...};
             */
        getBadgeBackgroundColor(details: chrome.browserAction.TabDetails): Promise<number[]>;
        /**
             * Since Chrome 19.
             * Gets the html document set as the popup for this browser action.
             * @param callback The callback parameter should be a function that looks like this:
             * function(string result) {...};
             */
        getPopup(details: chrome.browserAction.TabDetails): Promise<string>;
        /**
             * Sets the icon for the browser action. The icon can be specified either as the path to an image file or as the pixel data from a canvas element, or as dictionary of either one of those. Either the path or the imageData property must be specified.
             * @param callback If you specify the callback parameter, it should be a function that looks like this:
             * function() {...};
             */
        setIcon(details: chrome.browserAction.TabIconDetails): Promise<void>;
    }
    /**
     * Use the chrome.browsingData API to remove browsing data from a user's local profile.
     * Availability: Since Chrome 19.
     * Permissions:  "browsingData"
     */
    export interface BrowsingData {
        /**
             * Since Chrome 26.
             * Reports which types of data are currently selected in the 'Clear browsing data' settings UI. Note: some of the data types included in this API are not available in the settings UI, and some UI settings control more than one data type listed here.
             * @param callback The callback parameter should be a function that looks like this:
             * function(object result) {...};
             */
        settings(): Promise<chrome.browsingData.SettingsCallback>;
        /**
             * Clears plugins' data.
             * @param callback Called when plugins' data has been cleared.
             * If you specify the callback parameter, it should be a function that looks like this:
             * function() {...};
             */
        removePluginData(options: chrome.browsingData.RemovalOptions): Promise<void>;
        /**
             * Clears the browser's stored form data (autofill).
             * @param callback Called when the browser's form data has been cleared.
             * If you specify the callback parameter, it should be a function that looks like this:
             * function() {...};
             */
        removeFormData(options: chrome.browsingData.RemovalOptions): Promise<void>;
        /**
             * Clears websites' file system data.
             * @param callback Called when websites' file systems have been cleared.
             * If you specify the callback parameter, it should be a function that looks like this:
             * function() {...};
             */
        removeFileSystems(options: chrome.browsingData.RemovalOptions): Promise<void>;
        /**
             * Clears various types of browsing data stored in a user's profile.
             * @param dataToRemove The set of data types to remove.
             * @param callback Called when deletion has completed.
             * If you specify the callback parameter, it should be a function that looks like this:
             * function() {...};
             */
        remove(options: chrome.browsingData.RemovalOptions, dataToRemove: chrome.browsingData.DataTypeSet): Promise<void>;
        /**
             * Clears the browser's stored passwords.
             * @param callback Called when the browser's passwords have been cleared.
             * If you specify the callback parameter, it should be a function that looks like this:
             * function() {...};
             */
        removePasswords(options: chrome.browsingData.RemovalOptions): Promise<void>;
        /**
             * Clears the browser's cookies and server-bound certificates modified within a particular timeframe.
             * @param callback Called when the browser's cookies and server-bound certificates have been cleared.
             * If you specify the callback parameter, it should be a function that looks like this:
             * function() {...};
             */
        removeCookies(options: chrome.browsingData.RemovalOptions): Promise<void>;
        /**
             * Clears websites' WebSQL data.
             * @param callback Called when websites' WebSQL databases have been cleared.
             * If you specify the callback parameter, it should be a function that looks like this:
             * function() {...};
             */
        removeWebSQL(options: chrome.browsingData.RemovalOptions): Promise<void>;
        /**
             * Clears websites' appcache data.
             * @param callback Called when websites' appcache data has been cleared.
             * If you specify the callback parameter, it should be a function that looks like this:
             * function() {...};
             */
        removeAppcache(options: chrome.browsingData.RemovalOptions): Promise<void>;
        /**
             * Clears the browser's list of downloaded files (not the downloaded files themselves).
             * @param callback Called when the browser's list of downloaded files has been cleared.
             * If you specify the callback parameter, it should be a function that looks like this:
             * function() {...};
             */
        removeDownloads(options: chrome.browsingData.RemovalOptions): Promise<void>;
        /**
             * Clears websites' local storage data.
             * @param callback Called when websites' local storage has been cleared.
             * If you specify the callback parameter, it should be a function that looks like this:
             * function() {...};
             */
        removeLocalStorage(options: chrome.browsingData.RemovalOptions): Promise<void>;
        /**
             * Clears the browser's cache.
             * @param callback Called when the browser's cache has been cleared.
             * If you specify the callback parameter, it should be a function that looks like this:
             * function() {...};
             */
        removeCache(options: chrome.browsingData.RemovalOptions): Promise<void>;
        /**
             * Clears the browser's history.
             * @param callback Called when the browser's history has cleared.
             * If you specify the callback parameter, it should be a function that looks like this:
             * function() {...};
             */
        removeHistory(options: chrome.browsingData.RemovalOptions): Promise<void>;
        /**
             * Clears websites' IndexedDB data.
             * @param callback Called when websites' IndexedDB data has been cleared.
             * If you specify the callback parameter, it should be a function that looks like this:
             * function() {...};
             */
        removeIndexedDB(options: chrome.browsingData.RemovalOptions): Promise<void>;
    }
    /**
     * Use the commands API to add keyboard shortcuts that trigger actions in your extension, for example, an action to open the browser action or send a command to the extension.
     * Availability: Since Chrome 25.
     * Manifest:  "commands": {...}
     */
    export interface Commands {
        /**
             * Returns all the registered extension commands for this extension and their shortcut (if active).
             * @param callback Called to return the registered commands.
             * If you specify the callback parameter, it should be a function that looks like this:
             * function(array of Command commands) {...};
             */
        getAll(): Promise<chrome.commands.Command[]>;
    }
    /**
     * Use the chrome.contentSettings API to change settings that control whether websites can use features such as cookies, JavaScript, and plugins. More generally speaking, content settings allow you to customize Chrome's behavior on a per-site basis instead of globally.
     * Availability: Since Chrome 16.
     * Permissions:  "contentSettings"
     */
    export interface ContentSettings {
    }
    /**
     * Use the chrome.contextMenus API to add items to Google Chrome's context menu. You can choose what types of objects your context menu additions apply to, such as images, hyperlinks, and pages.
     * Availability: Since Chrome 6.
     * Permissions:  "contextMenus"
     */
    export interface ContextMenus {
        /**
             * Removes all context menu items added by this extension.
             * @param callback Called when removal is complete.
             * If you specify the callback parameter, it should be a function that looks like this:
             * function() {...};
             */
        removeAll(): Promise<void>;
        /**
             * Creates a new context menu item. Note that if an error occurs during creation, you may not find out until the creation callback fires (the details will be in chrome.runtime.lastError).
             * @param callback Called when the item has been created in the browser. If there were any problems creating the item, details will be available in chrome.runtime.lastError.
             * If you specify the callback parameter, it should be a function that looks like this:
             * function() {...};
             */
        create(createProperties: chrome.contextMenus.CreateProperties): Promise<void>;
        /**
             * Updates a previously created context menu item.
             * @param id The ID of the item to update.
             * @param updateProperties The properties to update. Accepts the same values as the create function.
             * @param callback Called when the context menu has been updated.
             * If you specify the callback parameter, it should be a function that looks like this:
             * function() {...};
             */
        update(id: string, updateProperties: chrome.contextMenus.UpdateProperties): Promise<void>;
        /**
             * Updates a previously created context menu item.
             * @param id The ID of the item to update.
             * @param updateProperties The properties to update. Accepts the same values as the create function.
             * @param callback Called when the context menu has been updated.
             * If you specify the callback parameter, it should be a function that looks like this:
             * function() {...};
             */
        update(id: number, updateProperties: chrome.contextMenus.UpdateProperties): Promise<void>;
        /**
             * Removes a context menu item.
             * @param menuItemId The ID of the context menu item to remove.
             * @param callback Called when the context menu has been removed.
             * If you specify the callback parameter, it should be a function that looks like this:
             * function() {...};
             */
        remove(menuItemId: string): Promise<void>;
        /**
             * Removes a context menu item.
             * @param menuItemId The ID of the context menu item to remove.
             * @param callback Called when the context menu has been removed.
             * If you specify the callback parameter, it should be a function that looks like this:
             * function() {...};
             */
        remove(menuItemId: number): Promise<void>;
    }
    /**
     * Use the chrome.cookies API to query and modify cookies, and to be notified when they change.
     * Availability: Since Chrome 6.
     * Permissions:  "cookies", host permissions
     */
    export interface Cookies {
        /**
             * Lists all existing cookie stores.
             * @param callback The callback parameter should be a function that looks like this:
             * function(array of CookieStore cookieStores) {...};
             * Parameter cookieStores: All the existing cookie stores.
             */
        getAllCookieStores(): Promise<chrome.cookies.CookieStore[]>;
        /**
             * Retrieves all cookies from a single cookie store that match the given information. The cookies returned will be sorted, with those with the longest path first. If multiple cookies have the same path length, those with the earliest creation time will be first.
             * @param details Information to filter the cookies being retrieved.
             * @param callback The callback parameter should be a function that looks like this:
             * function(array of Cookie cookies) {...};
             * Parameter cookies: All the existing, unexpired cookies that match the given cookie info.
             */
        getAll(details: chrome.cookies.GetAllDetails): Promise<chrome.cookies.Cookie[]>;
        /**
             * Sets a cookie with the given cookie data; may overwrite equivalent cookies if they exist.
             * @param details Details about the cookie being set.
             * @param callback If you specify the callback parameter, it should be a function that looks like this:
             * function( Cookie cookie) {...};
             * Optional parameter cookie: Contains details about the cookie that's been set. If setting failed for any reason, this will be "null", and "chrome.runtime.lastError" will be set.
             */
        set(details: chrome.cookies.SetDetails): Promise<chrome.cookies.Cookie | null>;
        /**
             * Deletes a cookie by name.
             * @param details Information to identify the cookie to remove.
             * @param callback If you specify the callback parameter, it should be a function that looks like this:
             * function(object details) {...};
             */
        remove(details: chrome.cookies.Details): Promise<chrome.cookies.Details>;
        /**
             * Retrieves information about a single cookie. If more than one cookie of the same name exists for the given URL, the one with the longest path will be returned. For cookies with the same path length, the cookie with the earliest creation time will be returned.
             * @param details Details to identify the cookie being retrieved.
             * @param callback The callback parameter should be a function that looks like this:
             * function( Cookie cookie) {...};
             * Parameter cookie: Contains details about the cookie. This parameter is null if no such cookie was found.
             */
        get(details: chrome.cookies.Details): Promise<chrome.cookies.Cookie | null>;
    }
    /**
     * The chrome.debugger API serves as an alternate transport for Chrome's remote debugging protocol. Use chrome.debugger to attach to one or more tabs to instrument network interaction, debug JavaScript, mutate the DOM and CSS, etc. Use the Debuggee tabId to target tabs with sendCommand and route events by tabId from onEvent callbacks.
     * Availability: Since Chrome 18.
     * Permissions:  "debugger"
     */
    export interface DeclarativeContent {
    }
    export interface DeclarativeWebRequest {
    }
    /**
     * Desktop Capture API that can be used to capture content of screen, individual windows or tabs.
     * Availability: Since Chrome 34.
     * Permissions:  "desktopCapture"
     */
    export interface DesktopCapture {
        /**
             * Shows desktop media picker UI with the specified set of sources.
             * @param sources Set of sources that should be shown to the user.
             * @param callback The callback parameter should be a function that looks like this:
             * function(string streamId) {...};
             * Parameter streamId: An opaque string that can be passed to getUserMedia() API to generate media stream that corresponds to the source selected by the user. If user didn't select any source (i.e. canceled the prompt) then the callback is called with an empty streamId. The created streamId can be used only once and expires after a few seconds when it is not used.
             */
        chooseDesktopMedia(sources: string[]): Promise<string>;
        /**
             * Shows desktop media picker UI with the specified set of sources.
             * @param sources Set of sources that should be shown to the user.
             * @param targetTab Optional tab for which the stream is created. If not specified then the resulting stream can be used only by the calling extension. The stream can only be used by frames in the given tab whose security origin matches tab.url.
             * @param callback The callback parameter should be a function that looks like this:
             * function(string streamId) {...};
             * Parameter streamId: An opaque string that can be passed to getUserMedia() API to generate media stream that corresponds to the source selected by the user. If user didn't select any source (i.e. canceled the prompt) then the callback is called with an empty streamId. The created streamId can be used only once and expires after a few seconds when it is not used.
             */
        chooseDesktopMedia(sources: string[], targetTab: chrome.tabs.Tab): Promise<string>;
    }
    /**
     * Use the chrome.documentScan API to discover and retrieve images from attached paper document scanners.
     * Availability: Since Chrome 44.
     * Permissions:  "documentScan"
     * Important: This API works only on Chrome OS.
     */
    export interface DocumentScan {
        /**
             * Performs a document scan. On success, the PNG data will be sent to the callback.
             * @param options Object containing scan parameters.
             * @param callback Called with the result and data from the scan.
             * The callback parameter should be a function that looks like this:
             * function(object result) {...};
             */
        scan(options: chrome.documentScan.DocumentScanOptions): Promise<chrome.documentScan.DocumentScanCallbackArg>;
    }
    /**
     * Use the chrome.downloads API to programmatically initiate, monitor, manipulate, and search for downloads.
     * Availability: Since Chrome 31.
     * Permissions:  "downloads"
     */
    export interface Downloads {
        /**
             * Find DownloadItem. Set query to the empty object to get all DownloadItem. To get a specific DownloadItem, set only the id field. To page through a large number of items, set orderBy: ['-startTime'], set limit to the number of items per page, and set startedAfter to the startTime of the last item from the last page.
             * @param callback The callback parameter should be a function that looks like this:
             * function(array of DownloadItem results) {...};
             */
        search(query: chrome.downloads.DownloadQuery): Promise<chrome.downloads.DownloadItem[]>;
        /**
             * Pause the download. If the request was successful the download is in a paused state. Otherwise runtime.lastError contains an error message. The request will fail if the download is not active.
             * @param downloadId The id of the download to pause.
             * @param callback Called when the pause request is completed.
             * If you specify the callback parameter, it should be a function that looks like this:
             * function() {...};
             */
        pause(downloadId: number): Promise<void>;
        /**
             * Retrieve an icon for the specified download. For new downloads, file icons are available after the onCreated event has been received. The image returned by this function while a download is in progress may be different from the image returned after the download is complete. Icon retrieval is done by querying the underlying operating system or toolkit depending on the platform. The icon that is returned will therefore depend on a number of factors including state of the download, platform, registered file types and visual theme. If a file icon cannot be determined, runtime.lastError will contain an error message.
             * @param downloadId The identifier for the download.
             * @param callback A URL to an image that represents the download.
             * The callback parameter should be a function that looks like this:
             * function(string iconURL) {...};
             */
        getFileIcon(downloadId: number): Promise<string>;
        /**
             * Retrieve an icon for the specified download. For new downloads, file icons are available after the onCreated event has been received. The image returned by this function while a download is in progress may be different from the image returned after the download is complete. Icon retrieval is done by querying the underlying operating system or toolkit depending on the platform. The icon that is returned will therefore depend on a number of factors including state of the download, platform, registered file types and visual theme. If a file icon cannot be determined, runtime.lastError will contain an error message.
             * @param downloadId The identifier for the download.
             * @param callback A URL to an image that represents the download.
             * The callback parameter should be a function that looks like this:
             * function(string iconURL) {...};
             */
        getFileIcon(downloadId: number, options: chrome.downloads.GetFileIconOptions): Promise<string>;
        /**
             * Resume a paused download. If the request was successful the download is in progress and unpaused. Otherwise runtime.lastError contains an error message. The request will fail if the download is not active.
             * @param downloadId The id of the download to resume.
             * @param callback  Called when the resume request is completed.
             * If you specify the callback parameter, it should be a function that looks like this:
             * function() {...};
             */
        resume(downloadId: number): Promise<void>;
        /**
             * Cancel a download. When callback is run, the download is cancelled, completed, interrupted or doesn't exist anymore.
             * @param downloadId The id of the download to cancel.
             * @param callback Called when the cancel request is completed.
             * If you specify the callback parameter, it should be a function that looks like this:
             * function() {...};
             */
        cancel(downloadId: number): Promise<void>;
        /**
             * Download a URL. If the URL uses the HTTP[S] protocol, then the request will include all cookies currently set for its hostname. If both filename and saveAs are specified, then the Save As dialog will be displayed, pre-populated with the specified filename. If the download started successfully, callback will be called with the new DownloadItem's downloadId. If there was an error starting the download, then callback will be called with downloadId=undefined and runtime.lastError will contain a descriptive string. The error strings are not guaranteed to remain backwards compatible between releases. Extensions must not parse it.
             * @param options What to download and how.
             * @param callback Called with the id of the new DownloadItem.
             * If you specify the callback parameter, it should be a function that looks like this:
             * function(integer downloadId) {...};
             */
        download(options: chrome.downloads.DownloadOptions): Promise<number>;
        /**
             * Erase matching DownloadItem from history without deleting the downloaded file. An onErased event will fire for each DownloadItem that matches query, then callback will be called.
             * @param callback If you specify the callback parameter, it should be a function that looks like this:
             * function(array of integer erasedIds) {...};
             */
        erase(query: chrome.downloads.DownloadQuery): Promise<number[]>;
        /**
             * Remove the downloaded file if it exists and the DownloadItem is complete; otherwise return an error through runtime.lastError.
             * @param callback If you specify the callback parameter, it should be a function that looks like this:
             * function() {...};
             */
        removeFile(downloadId: number): Promise<void>;
        /**
             * Prompt the user to accept a dangerous download. Can only be called from a visible context (tab, window, or page/browser action popup). Does not automatically accept dangerous downloads. If the download is accepted, then an onChanged event will fire, otherwise nothing will happen. When all the data is fetched into a temporary file and either the download is not dangerous or the danger has been accepted, then the temporary file is renamed to the target filename, the |state| changes to 'complete', and onChanged fires.
             * @param downloadId The identifier for the DownloadItem.
             * @param callback Called when the danger prompt dialog closes.
             * If you specify the callback parameter, it should be a function that looks like this:
             * function() {...};
             */
        acceptDanger(downloadId: number): Promise<void>;
    }
    /**
     * The chrome.events namespace contains common types used by APIs dispatching events to notify you when something interesting happens.
     * Availability: Since Chrome 21.
     */
    export interface Events {
    }
    /**
     * The chrome.extension API has utilities that can be used by any extension page. It includes support for exchanging messages between an extension and its content scripts or between extensions, as described in detail in Message Passing.
     * Availability: Since Chrome 5.
     */
    export interface Extension {
        /**
             * Retrieves the state of the extension's access to the 'file://' scheme (as determined by the user-controlled 'Allow access to File URLs' checkbox.
             * Since Chrome 12.
             * @param callback The callback parameter should be a function that looks like this:
             * function(boolean isAllowedAccess) {...};
             * Parameter isAllowedAccess: True if the extension can access the 'file://' scheme, false otherwise.
             */
        isAllowedFileSchemeAccess(): Promise<boolean>;
        /**
             * Retrieves the state of the extension's access to Incognito-mode (as determined by the user-controlled 'Allowed in Incognito' checkbox.
             * Since Chrome 12.
             * @param callback The callback parameter should be a function that looks like this:
             * function(boolean isAllowedAccess) {...};
             * Parameter isAllowedAccess: True if the extension has access to Incognito mode, false otherwise.
             */
        isAllowedIncognitoAccess(): Promise<boolean>;
    }
    /**
     * Use the chrome.fileBrowserHandler API to extend the Chrome OS file browser. For example, you can use this API to enable users to upload files to your website.
     * Availability: Since Chrome 12.
     * Permissions:  "fileBrowserHandler"
     * Important: This API works only on Chrome OS.
     */
    export interface FileBrowserHandler {
        /**
             * Prompts user to select file path under which file should be saved. When the file is selected, file access permission required to use the file (read, write and create) are granted to the caller. The file will not actually get created during the function call, so function caller must ensure its existence before using it. The function has to be invoked with a user gesture.
             * Since Chrome 21.
             * @param selectionParams Parameters that will be used while selecting the file.
             * @param callback Function called upon completion.
             * The callback parameter should be a function that looks like this:
             * function(object result) {...};
             * Parameter result: Result of the method.
             */
        selectFile(selectionParams: chrome.fileBrowserHandler.SelectionParams): Promise<chrome.fileBrowserHandler.SelectionResult>;
    }
    /**
     * Use the chrome.fileSystemProvider API to create file systems, that can be accessible from the file manager on Chrome OS.
     * Availability: Since Chrome 40.
     * Permissions:  "fileSystemProvider"
     * Important: This API works only on Chrome OS.
     */
    export interface FileSystemProvider {
        /**
             * Mounts a file system with the given fileSystemId and displayName. displayName will be shown in the left panel of Files.app. displayName can contain any characters including '/', but cannot be an empty string. displayName must be descriptive but doesn't have to be unique. The fileSystemId must not be an empty string.
             * Depending on the type of the file system being mounted, the source option must be set appropriately.
             * In case of an error, runtime.lastError will be set with a corresponding error code.
             * @param callback A generic result callback to indicate success or failure.
             * If you specify the callback parameter, it should be a function that looks like this:
             * function() {...};
             */
        mount(options: chrome.fileSystemProvider.MountOptions): Promise<void>;
        /**
             * Unmounts a file system with the given fileSystemId. It must be called after onUnmountRequested is invoked. Also, the providing extension can decide to perform unmounting if not requested (eg. in case of lost connection, or a file error).
             * In case of an error, runtime.lastError will be set with a corresponding error code.
             * @param callback A generic result callback to indicate success or failure.
             * If you specify the callback parameter, it should be a function that looks like this:
             * function() {...};
             */
        unmount(options: chrome.fileSystemProvider.UnmountOptions): Promise<void>;
        /**
             * Returns all file systems mounted by the extension.
             * @param callback Callback to receive the result of getAll function.
             * The callback parameter should be a function that looks like this:
             * function(array of FileSystemInfo fileSystems) {...};
             */
        getAll(): Promise<chrome.fileSystemProvider.FileSystemInfo[]>;
        /**
             * Returns information about a file system with the passed fileSystemId.
             * @since Since Chrome 42.
             * @param callback Callback to receive the result of get function.
             * The callback parameter should be a function that looks like this:
             * function(FileSystemInfo fileSystem) {...};
             */
        get(fileSystemId: string): Promise<chrome.fileSystemProvider.FileSystemInfo>;
        /**
             * Notifies about changes in the watched directory at observedPath in recursive mode. If the file system is mounted with supportsNofityTag, then tag must be provided, and all changes since the last notification always reported, even if the system was shutdown. The last tag can be obtained with getAll.
             * To use, the file_system_provider.notify manifest option must be set to true.
             * Value of tag can be any string which is unique per call, so it's possible to identify the last registered notification. Eg. if the providing extension starts after a reboot, and the last registered notification's tag is equal to "123", then it should call notify for all changes which happened since the change tagged as "123". It cannot be an empty string.
             * Not all providers are able to provide a tag, but if the file system has a changelog, then the tag can be eg. a change number, or a revision number.
             * Note that if a parent directory is removed, then all descendant entries are also removed, and if they are watched, then the API must be notified about the fact. Also, if a directory is renamed, then all descendant entries are in fact removed, as there is no entry under their original paths anymore.
             * In case of an error, runtime.lastError will be set will a corresponding error code.
             * @param callback A generic result callback to indicate success or failure.
             * If you specify the callback parameter, it should be a function that looks like this:
             * function() {...};
             */
        notify(options: chrome.fileSystemProvider.NotificationOptions): Promise<void>;
    }
    /**
     * Use the chrome.fontSettings API to manage Chrome's font settings.
     * Availability: Since Chrome 22.
     * Permissions:  "fontSettings"
     */
    export interface FontSettings {
        /**
             * Sets the default font size.
             * @param callback If you specify the callback parameter, it should be a function that looks like this:
             * function() {...};
             */
        setDefaultFontSize(details: chrome.fontSettings.DefaultFontSizeDetails): Promise<void>;
        /**
             * Gets the font for a given script and generic font family.
             * @param callback If you specify the callback parameter, it should be a function that looks like this:
             * function(object details) {...};
             */
        getFont(details: chrome.fontSettings.FontDetails): Promise<chrome.fontSettings.FontDetailsResult>;
        /**
             * Gets the default font size.
             * @param details This parameter is currently unused.
             * @param callback If you specify the callback parameter, it should be a function that looks like this:
             * function(object details) {...};
             */
        getDefaultFontSize(details?: Object): Promise<chrome.fontSettings.FontSizeDetails>;
        /**
             * Gets the minimum font size.
             * @param details This parameter is currently unused.
             * @param callback If you specify the callback parameter, it should be a function that looks like this:
             * function(object details) {...};
             */
        getMinimumFontSize(details?: chrome.fontSettings.FontSizeDetails): Promise<chrome.fontSettings.FontSizeDetails>;
        /**
             * Sets the minimum font size.
             * @param callback If you specify the callback parameter, it should be a function that looks like this:
             * function() {...};
             */
        setMinimumFontSize(details: chrome.fontSettings.SetFontSizeDetails): Promise<void>;
        /**
             * Gets the default size for fixed width fonts.
             * @param details This parameter is currently unused.
             * @param callback If you specify the callback parameter, it should be a function that looks like this:
             * function(object details) {...};
             */
        getDefaultFixedFontSize(details?: Object): Promise<chrome.fontSettings.FontSizeDetails>;
        /**
             * Clears the default font size set by this extension, if any.
             * @param details This parameter is currently unused.
             * @param callback If you specify the callback parameter, it should be a function that looks like this:
             * function() {...};
             */
        clearDefaultFontSize(details?: Object): Promise<void>;
        /**
             * Sets the default size for fixed width fonts.
             * @param callback If you specify the callback parameter, it should be a function that looks like this:
             * function() {...};
             */
        setDefaultFixedFontSize(details: chrome.fontSettings.SetFontSizeDetails): Promise<void>;
        /**
             * Clears the font set by this extension, if any.
             * @param callback If you specify the callback parameter, it should be a function that looks like this:
             * function() {...};
             */
        clearFont(details: chrome.fontSettings.FontDetails): Promise<void>;
        /**
             * Sets the font for a given script and generic font family.
             * @param callback If you specify the callback parameter, it should be a function that looks like this:
             * function(object details) {...};
             */
        setFont(details: chrome.fontSettings.SetFontDetails): Promise<void>;
        /**
             * Clears the minimum font size set by this extension, if any.
             * @param details This parameter is currently unused.
             * @param callback If you specify the callback parameter, it should be a function that looks like this:
             * function() {...};
             */
        clearMinimumFontSize(details?: Object): Promise<void>;
        /**
             * Gets a list of fonts on the system.
             * @param callback The callback parameter should be a function that looks like this:
             * function(array of FontName results) {...};
             */
        getFontList(): Promise<chrome.fontSettings.FontName[]>;
        /**
             * Clears the default fixed font size set by this extension, if any.
             * @param details This parameter is currently unused.
             * @param callback If you specify the callback parameter, it should be a function that looks like this:
             * function() {...};
             */
        clearDefaultFixedFontSize(details: Object): Promise<void>;
    }
    /**
     * Use chrome.gcm to enable apps and extensions to send and receive messages through the Google Cloud Messaging Service.
     * Availability: Since Chrome 35.
     * Permissions:  "gcm"
     */
    export interface Gcm {
        /**
             * Registers the application with GCM. The registration ID will be returned by the callback. If register is called again with the same list of senderIds, the same registration ID will be returned.
             * @param senderIds A list of server IDs that are allowed to send messages to the application. It should contain at least one and no more than 100 sender IDs.
             * @param callback Function called when registration completes. It should check runtime.lastError for error when registrationId is empty.
             * The callback parameter should be a function that looks like this:
             * function(string registrationId) {...};
             * Parameter registrationId: A registration ID assigned to the application by the GCM.
             */
        register(senderIds: string[]): Promise<string>;
        /**
             * Unregisters the application from GCM.
             * @param callback A function called after the unregistration completes. Unregistration was successful if runtime.lastError is not set.
             * The callback parameter should be a function that looks like this:
             * function() {...};
             */
        unregister(): Promise<void>;
        /**
             * Sends a message according to its contents.
             * @param message A message to send to the other party via GCM.
             * @param callback A function called after the message is successfully queued for sending. runtime.lastError should be checked, to ensure a message was sent without problems.
             * The callback parameter should be a function that looks like this:
             * function(string messageId) {...};
             * Parameter messageId: The ID of the message that the callback was issued for.
             */
        send(message: chrome.gcm.OutgoingMessage): Promise<string>;
    }
    /**
     * Use the chrome.history API to interact with the browser's record of visited pages. You can add, remove, and query for URLs in the browser's history. To override the history page with your own version, see Override Pages.
     * Availability: Since Chrome 5.
     * Permissions:  "history"
     */
    export interface History {
        /**
             * Searches the history for the last visit time of each page matching the query.
             * @param callback The callback parameter should be a function that looks like this:
             * function(array of HistoryItem results) {...};
             */
        search(query: chrome.history.HistoryQuery): Promise<chrome.history.HistoryItem[]>;
        /**
             * Adds a URL to the history at the current time with a transition type of "link".
             * @param callback If you specify the callback parameter, it should be a function that looks like this:
             * function() {...};
             */
        addUrl(details: chrome.history.Url): Promise<void>;
        /**
             * Removes all items within the specified date range from the history. Pages will not be removed from the history unless all visits fall within the range.
             * @param callback The callback parameter should be a function that looks like this:
             * function() {...};
             */
        deleteRange(range: chrome.history.Range): Promise<void>;
        /**
             * Deletes all items from the history.
             * @param callback The callback parameter should be a function that looks like this:
             * function() {...};
             */
        deleteAll(): Promise<void>;
        /**
             * Retrieves information about visits to a URL.
             * @param callback The callback parameter should be a function that looks like this:
             * function(array of VisitItem results) {...};
             */
        getVisits(details: chrome.history.Url): Promise<chrome.history.VisitItem[]>;
        /**
             * Removes all occurrences of the given URL from the history.
             * @param callback If you specify the callback parameter, it should be a function that looks like this:
             * function() {...};
             */
        deleteUrl(details: chrome.history.Url): Promise<void>;
    }
    /**
     * Use the chrome.i18n infrastructure to implement internationalization across your whole app or extension.
     * @since Chrome 5.
     */
    export interface I18n {
        /**
             * Gets the accept-languages of the browser. This is different from the locale used by the browser; to get the locale, use i18n.getUILanguage.
             * @param callback The callback parameter should be a function that looks like this:
             * function(array of string languages) {...};
             * Parameter languages: Array of the accept languages of the browser, such as en-US,en,zh-CN
             */
        getAcceptLanguages(): Promise<string[]>;
        /** Detects the language of the provided text using CLD.
             * @param text User input string to be translated.
             * @param callback The callback parameter should be a function that looks like this: function(object result) {...};
             */
        detectLanguage(text: string): Promise<chrome.i18n.LanguageDetectionResult>;
    }
    /**
     * Use the chrome.identity API to get OAuth2 access tokens.
     * Permissions:  "identity"
     * @since Chrome 29.
     */
    export interface Identity {
        /**
             * Retrieves a list of AccountInfo objects describing the accounts present on the profile.
             * getAccounts is only supported on dev channel.
             * Dev channel only.
             */
        getAccounts(): Promise<chrome.identity.AccountInfo[]>;
        /**
             * Gets an OAuth2 access token using the client ID and scopes specified in the oauth2 section of manifest.json.
             * The Identity API caches access tokens in memory, so it's ok to call getAuthToken non-interactively any time a token is required. The token cache automatically handles expiration.
             * For a good user experience it is important interactive token requests are initiated by UI in your app explaining what the authorization is for. Failing to do this will cause your users to get authorization requests, or Chrome sign in screens if they are not signed in, with with no context. In particular, do not use getAuthToken interactively when your app is first launched.
             * @param details Token options.
             * @param callback Called with an OAuth2 access token as specified by the manifest, or undefined if there was an error.
             * If you specify the callback parameter, it should be a function that looks like this:
             * function(string token) {...};
             */
        getAuthToken(details: chrome.identity.TokenDetails): Promise<string>;
        /**
             * Retrieves email address and obfuscated gaia id of the user signed into a profile.
             * This API is different from identity.getAccounts in two ways. The information returned is available offline, and it only applies to the primary account for the profile.
             * @since Chrome 37.
             */
        getProfileUserInfo(): Promise<chrome.identity.UserInfo>;
        /**
             * Removes an OAuth2 access token from the Identity API's token cache.
             * If an access token is discovered to be invalid, it should be passed to removeCachedAuthToken to remove it from the cache. The app may then retrieve a fresh token with getAuthToken.
             * @param details Token information.
             * @param callback Called when the token has been removed from the cache.
             * If you specify the callback parameter, it should be a function that looks like this:
             * function() {...};
             */
        removeCachedAuthToken(details: chrome.identity.TokenInformation): Promise<void>;
        /**
             * Starts an auth flow at the specified URL.
             * This method enables auth flows with non-Google identity providers by launching a web view and navigating it to the first URL in the provider's auth flow. When the provider redirects to a URL matching the pattern https://<app-id>.chromiumapp.org/*, the window will close, and the final redirect URL will be passed to the callback function.
             * For a good user experience it is important interactive auth flows are initiated by UI in your app explaining what the authorization is for. Failing to do this will cause your users to get authorization requests with no context. In particular, do not launch an interactive auth flow when your app is first launched.
             * @param details WebAuth flow options.
             * @param callback Called with the URL redirected back to your application.
             * The callback parameter should be a function that looks like this:
             * function(string responseUrl) {...};
             */
        launchWebAuthFlow(details: chrome.identity.WebAuthFlowOptions): Promise<string>;
    }
    /**
     * Use the chrome.idle API to detect when the machine's idle state changes.
     * Permissions:  "idle"
     * @since Chrome 6.
     */
    export interface Idle {
        /**
             * Returns "locked" if the system is locked, "idle" if the user has not generated any input for a specified number of seconds, or "active" otherwise.
             * @param detectionIntervalInSeconds The system is considered idle if detectionIntervalInSeconds seconds have elapsed since the last user input detected.
             * Since Chrome 25.
             * @param callback The callback parameter should be a function that looks like this:
             * function( IdleState newState) {...};
             */
        queryState(detectionIntervalInSeconds: number): Promise<string>;
    }
    /**
     * The chrome.management API provides ways to manage the list of extensions/apps that are installed and running. It is particularly useful for extensions that override the built-in New Tab page.
     * Permissions:  "management"
     * @since Chrome 8.
     */
    export interface Management {
        /**
             * Enables or disables an app or extension.
             * @param id This should be the id from an item of management.ExtensionInfo.
             * @param enabled Whether this item should be enabled or disabled.
             * @param callback If you specify the callback parameter, it should be a function that looks like this:
             * function() {...};
             */
        setEnabled(id: string, enabled: boolean): Promise<void>;
        /**
             * Returns a list of permission warnings for the given extension id.
             * @since Chrome 15.
             * @param id The ID of an already installed extension.
             * @param callback If you specify the callback parameter, it should be a function that looks like this:
             * function(array of string permissionWarnings) {...};
             */
        getPermissionWarningsById(id: string): Promise<string[]>;
        /**
             * Returns information about the installed extension, app, or theme that has the given ID.
             * @since Chrome 9.
             * @param id The ID from an item of management.ExtensionInfo.
             * @param callback If you specify the callback parameter, it should be a function that looks like this:
             * function( ExtensionInfo result) {...};
             */
        get(id: string): Promise<chrome.management.ExtensionInfo>;
        /**
             * Returns a list of information about installed extensions and apps.
             * @param callback If you specify the callback parameter, it should be a function that looks like this:
             * function(array of ExtensionInfo result) {...};
             */
        getAll(): Promise<chrome.management.ExtensionInfo[]>;
        /**
             * Returns a list of permission warnings for the given extension manifest string. Note: This function can be used without requesting the 'management' permission in the manifest.
             * @since Chrome 15.
             * @param manifestStr Extension manifest JSON string.
             * @param callback If you specify the callback parameter, it should be a function that looks like this:
             * function(array of string permissionWarnings) {...};
             */
        getPermissionWarningsByManifest(manifestStr: string): Promise<string[]>;
        /**
             * Launches an application.
             * @param id The extension id of the application.
             * @param callback If you specify the callback parameter, it should be a function that looks like this:
             * function() {...};
             */
        launchApp(id: string): Promise<void>;
        /**
             * Uninstalls a currently installed app or extension.
             * @since Chrome 21.
             * @param id This should be the id from an item of management.ExtensionInfo.
             * @param callback If you specify the callback parameter, it should be a function that looks like this:
             * function() {...};
             */
        uninstall(id: string, options?: chrome.management.UninstallOptions): Promise<void>;
        /**
             * Uninstalls a currently installed app or extension.
             * @deprecated since Chrome 21. The options parameter was added to this function.
             * @param id This should be the id from an item of management.ExtensionInfo.
             * @param callback If you specify the callback parameter, it should be a function that looks like this:
             * function() {...};
             */
        uninstall(id: string): Promise<void>;
        /**
             * Returns information about the calling extension, app, or theme. Note: This function can be used without requesting the 'management' permission in the manifest.
             * @since Chrome 39.
             * @param callback If you specify the callback parameter, it should be a function that looks like this:
             * function( ExtensionInfo result) {...};
             */
        getSelf(): Promise<chrome.management.ExtensionInfo>;
        /**
             * Uninstalls the calling extension.
             * Note: This function can be used without requesting the 'management' permission in the manifest.
             * @since Chrome 26.
             * @param callback If you specify the callback parameter, it should be a function that looks like this:
             * function() {...};
             */
        uninstallSelf(options?: chrome.management.UninstallOptions): Promise<void>;
        /**
             * Uninstalls the calling extension.
             * Note: This function can be used without requesting the 'management' permission in the manifest.
             * @since Chrome 26.
             * @param callback If you specify the callback parameter, it should be a function that looks like this:
             * function() {...};
             */
        uninstallSelf(): Promise<void>;
        /**
             * Display options to create shortcuts for an app. On Mac, only packaged app shortcuts can be created.
             * @since Chrome 37.
             * @param callback If you specify the callback parameter, it should be a function that looks like this:
             * function() {...};
             */
        createAppShortcut(id: string): Promise<void>;
        /**
             * Set the launch type of an app.
             * @since Chrome 37.
             * @param id This should be the id from an app item of management.ExtensionInfo.
             * @param launchType The target launch type. Always check and make sure this launch type is in ExtensionInfo.availableLaunchTypes, because the available launch types vary on different platforms and configurations.
             * @param callback If you specify the callback parameter, it should be a function that looks like this:
             * function() {...};
             */
        setLaunchType(id: string, launchType: string): Promise<void>;
        /**
             * Generate an app for a URL. Returns the generated bookmark app.
             * @since Chrome 37.
             * @param url The URL of a web page. The scheme of the URL can only be "http" or "https".
             * @param title The title of the generated app.
             * @param callback If you specify the callback parameter, it should be a function that looks like this:
             * function( ExtensionInfo result) {...};
             */
        generateAppForLink(url: string, title: string): Promise<chrome.management.ExtensionInfo>;
    }
    /**
     * Use the chrome.notifications API to create rich notifications using templates and show these notifications to users in the system tray.
     * Permissions:  "notifications"
     * @since Chrome 28.
     */
    export interface Notifications {
        /**
             * Creates and displays a notification.
             * @param notificationId Identifier of the notification. If not set or empty, an ID will automatically be generated. If it matches an existing notification, this method first clears that notification before proceeding with the create operation.
             * The notificationId parameter is required before Chrome 42.
             * @param options Contents of the notification.
             * @param callback Returns the notification id (either supplied or generated) that represents the created notification.
             * The callback is required before Chrome 42.
             * If you specify the callback parameter, it should be a function that looks like this:
             * function(string notificationId) {...};
             */
        create(notificationId: string, options: chrome.notifications.NotificationOptions): Promise<string>;
        /**
             * Creates and displays a notification.
             * @param notificationId Identifier of the notification. If not set or empty, an ID will automatically be generated. If it matches an existing notification, this method first clears that notification before proceeding with the create operation.
             * The notificationId parameter is required before Chrome 42.
             * @param options Contents of the notification.
             * @param callback Returns the notification id (either supplied or generated) that represents the created notification.
             * The callback is required before Chrome 42.
             * If you specify the callback parameter, it should be a function that looks like this:
             * function(string notificationId) {...};
             */
        create(options: chrome.notifications.NotificationOptions): Promise<string>;
        /**
             * Updates an existing notification.
             * @param notificationId The id of the notification to be updated. This is returned by notifications.create method.
             * @param options Contents of the notification to update to.
             * @param callback Called to indicate whether a matching notification existed.
             * The callback is required before Chrome 42.
             * If you specify the callback parameter, it should be a function that looks like this:
             * function(boolean wasUpdated) {...};
             */
        update(notificationId: string, options: chrome.notifications.NotificationOptions): Promise<boolean>;
        /**
             * Clears the specified notification.
             * @param notificationId The id of the notification to be cleared. This is returned by notifications.create method.
             * @param callback Called to indicate whether a matching notification existed.
             * The callback is required before Chrome 42.
             * If you specify the callback parameter, it should be a function that looks like this:
             * function(boolean wasCleared) {...};
             */
        clear(notificationId: string): Promise<boolean>;
        /**
             * Retrieves all the notifications.
             * @since Chrome 29.
             * @param callback Returns the set of notification_ids currently in the system.
             * The callback parameter should be a function that looks like this:
             * function(object notifications) {...};
             */
        getAll(): Promise<Object>;
        /**
             * Retrieves whether the user has enabled notifications from this app or extension.
             * @since Chrome 32.
             * @param callback Returns the current permission level.
             * The callback parameter should be a function that looks like this:
             * function( PermissionLevel level) {...};
             */
        getPermissionLevel(): Promise<string>;
    }
    /**
     * The omnibox API allows you to register a keyword with Google Chrome's address bar, which is also known as the omnibox.
     * Manifest:  "omnibox": {...}
     * @since Chrome 9.
     */
    export interface Omnibox {
    }
    /**
     * Use the chrome.pageAction API to put icons inside the address bar. Page actions represent actions that can be taken on the current page, but that aren't applicable to all pages.
     * Manifest:  "page_action": {...}
     * @since Chrome 5.
     */
    export interface PageAction {
        /**
             * Gets the title of the page action.
             * @since Chrome 19.
             * @param callback The callback parameter should be a function that looks like this:
             * function(string result) {...};
             */
        getTitle(details: chrome.pageAction.GetDetails): Promise<string>;
        /**
             * Gets the html document set as the popup for this page action.
             * @since Chrome 19.
             * @param callback The callback parameter should be a function that looks like this:
             * function(string result) {...};
             */
        getPopup(details: chrome.pageAction.GetDetails): Promise<string>;
        /**
             * Sets the icon for the page action. The icon can be specified either as the path to an image file or as the pixel data from a canvas element, or as dictionary of either one of those. Either the path or the imageData property must be specified.
             * @param callback If you specify the callback parameter, it should be a function that looks like this:
             * function() {...};
             */
        setIcon(details: chrome.pageAction.IconDetails): Promise<void>;
    }
    /**
     * Use the chrome.pageCapture API to save a tab as MHTML.
     * Permissions:  "pageCapture"
     * @since Chrome 18.
     */
    export interface PageCapture {
        /**
             * Saves the content of the tab with given id as MHTML.
             * @param callback Called when the MHTML has been generated.
             * The callback parameter should be a function that looks like this:
             * function(binary mhtmlData) {...};
             * Parameter mhtmlData: The MHTML data as a Blob.
             */
        saveAsMHTML(details: chrome.pageCapture.SaveDetails): Promise<any>;
    }
    /**
     * Use the chrome.permissions API to request declared optional permissions at run time rather than install time, so users understand why the permissions are needed and grant only those that are necessary.
     * @since Chrome 16.
     */
    export interface Permissions {
        /**
             * Checks if the extension has the specified permissions.
             * @param callback The callback parameter should be a function that looks like this:
             * function(boolean result) {...};
             * Parameter result: True if the extension has the specified permissions.
             */
        contains(permissions: chrome.permissions.Permissions): Promise<boolean>;
        /**
             * Gets the extension's current set of permissions.
             * @param callback The callback parameter should be a function that looks like this:
             * function( Permissions permissions) {...};
             * Parameter permissions: The extension's active permissions.
             */
        getAll(): Promise<chrome.permissions.Permissions>;
        /**
             * Requests access to the specified permissions. These permissions must be defined in the optional_permissions field of the manifest. If there are any problems requesting the permissions, runtime.lastError will be set.
             * @param callback If you specify the callback parameter, it should be a function that looks like this:
             * function(boolean granted) {...};
             * Parameter granted: True if the user granted the specified permissions.
             */
        request(permissions: chrome.permissions.Permissions): Promise<boolean>;
        /**
             * Removes access to the specified permissions. If there are any problems removing the permissions, runtime.lastError will be set.
             * @param callback If you specify the callback parameter, it should be a function that looks like this:
             * function(boolean removed) {...};
             * Parameter removed: True if the permissions were removed.
             */
        remove(permissions: chrome.permissions.Permissions): Promise<boolean>;
    }
    /**
     * Use the chrome.platformKeys API to access client certificates managed by the platform. If the user or policy grants the permission, an extension can use such a certficate in its custom authentication protocol. E.g. this allows usage of platform managed certificates in third party VPNs (see chrome.vpnProvider).
     * Permissions:  "platformKeys"
     * Important: This API works only on Chrome OS.
     * @since Chrome 45.
     */
    export interface PlatformKeys {
        /**
             * This function filters from a list of client certificates the ones that are known to the platform, match request and for which the extension has permission to access the certificate and its private key. If interactive is true, the user is presented a dialog where he can select from matching certificates and grant the extension access to the certificate. The selected/filtered client certificates will be passed to callback.
             * @param callback The callback parameter should be a function that looks like this:
             * function(array of Match matches) {...};
             * Parameter matches: The list of certificates that match the request, that the extension has permission for and, if interactive is true, that were selected by the user.
             */
        selectClientCertificates(details: chrome.platformKeys.ClientCertificateSelectDetails): Promise<chrome.platformKeys.Match[]>;
        /**
             * Passes the key pair of certificate for usage with platformKeys.subtleCrypto to callback.
             * @param certificate The certificate of a Match returned by selectClientCertificates.
             * @param parameters Determines signature/hash algorithm parameters additionally to the parameters fixed by the key itself. The same parameters are   accepted as by WebCrypto's importKey function, e.g. RsaHashedImportParams for a RSASSA-PKCS1-v1_5 key. For RSASSA-PKCS1-v1_5 keys, additionally the parameters { 'hash': { 'name': 'none' } } are supported. The sign function will then apply PKCS#1 v1.5 padding and but not hash the given data.
             * @param callback The public and private CryptoKey of a certificate which can only be used with platformKeys.subtleCrypto.
             * The callback parameter should be a function that looks like this:
             * function(object publicKey, object privateKey) {...};
             * Optional parameter privateKey: Might be null if this extension does not have access to it.
             */
        getKeyPair(certificate: ArrayBuffer, parameters: Object): Promise<[CryptoKey, CryptoKey | null]>;
        /**
             * Checks whether details.serverCertificateChain can be trusted for details.hostname according to the trust settings of the platform. Note: The actual behavior of the trust verification is not fully specified and might change in the future. The API implementation verifies certificate expiration, validates the certification path and checks trust by a known CA. The implementation is supposed to respect the EKU serverAuth and to support subject alternative names.
             * @param callback The callback parameter should be a function that looks like this:
             * function(object result) {...};
             */
        verifyTLSServerCertificate(details: chrome.platformKeys.ServerCertificateVerificationDetails): Promise<chrome.platformKeys.ServerCertificateVerificationResult>;
    }
    /**
     * Use the chrome.power API to override the system's power management features.
     * Permissions:  "power"
     * @since Chrome 27.
     */
    export interface Power {
    }
    /**
     * The chrome.printerProvider API exposes events used by print manager to query printers controlled by extensions, to query their capabilities and to submit print jobs to these printers.
     * Permissions:  "printerProvider"
     * @since Chrome 44.
     */
    export interface PrinterProvider {
    }
    /**
     * Use the chrome.privacy API to control usage of the features in Chrome that can affect a user's privacy. This API relies on the ChromeSetting prototype of the type API for getting and setting Chrome's configuration.
     * Permissions:  "privacy"
     * The Chrome Privacy Whitepaper gives background detail regarding the features which this API can control.
     * @since Chrome 18.
     */
    export interface Privacy {
    }
    /**
     * Use the chrome.proxy API to manage Chrome's proxy settings. This API relies on the ChromeSetting prototype of the type API for getting and setting the proxy configuration.
     * Permissions:  "proxy"
     * @since Chrome 13.
     */
    export interface Proxy {
    }
    /**
     * Use the chrome.runtime API to retrieve the background page, return details about the manifest, and listen for and respond to events in the app or extension lifecycle. You can also use this API to convert the relative path of URLs to fully-qualified URLs.
     * @since Chrome 22
     */
    export interface Runtime {
        /** Retrieves the JavaScript 'window' object for the background page running inside the current extension/app. If the background page is an event page, the system will ensure it is loaded before calling the callback. If there is no background page, an error is set. */
        getBackgroundPage(): Promise<Window>;
        /**
             * Returns a DirectoryEntry for the package directory.
             * @since Chrome 29.
             */
        getPackageDirectoryEntry(): Promise<DirectoryEntry>;
        /**
             * Returns information about the current platform.
             * @since Chrome 29.
             * @param callback Called with results
             */
        getPlatformInfo(): Promise<chrome.runtime.PlatformInfo>;
        /**
             * Requests an update check for this app/extension.
             * @since Chrome 25.
             * @param callback
             * Parameter status: Result of the update check. One of: "throttled", "no_update", or "update_available"
             * Optional parameter details: If an update is available, this contains more information about the available update.
             */
        requestUpdateCheck(): Promise<[string, chrome.runtime.UpdateCheckDetails]>;
        /**
             * Sets the URL to be visited upon uninstallation. This may be used to clean up server-side data, do analytics, and implement surveys. Maximum 255 characters.
             * @since Chrome 41.
             * @param url Since Chrome 34.
             * URL to be opened after the extension is uninstalled. This URL must have an http: or https: scheme. Set an empty string to not open a new tab upon uninstallation.
             * @param callback Called when the uninstall URL is set. If the given URL is invalid, runtime.lastError will be set.
             */
        setUninstallURL(url: string): Promise<void>;
        /**
             * Open your Extension's options page, if possible.
             * The precise behavior may depend on your manifest's options_ui or options_page key, or what Chrome happens to support at the time. For example, the page may be opened in a new tab, within chrome://extensions, within an App, or it may just focus an open options page. It will never cause the caller page to reload.
             * If your Extension does not declare an options page, or Chrome failed to create one for some other reason, the callback will set lastError.
             * @since Chrome 42.
             */
        openOptionsPage(): Promise<void>;
    }
    export interface ScriptBadge {
        getPopup(details: chrome.scriptBadge.GetPopupDetails): Promise<void>;
    }
    /**
     * Use the chrome.sessions API to query and restore tabs and windows from a browsing session.
     * Permissions:  "sessions"
     * @since Chrome 37.
     */
    export interface Sessions {
        /**
             * Gets the list of recently closed tabs and/or windows.
             * @param callback
             * Parameter sessions: The list of closed entries in reverse order that they were closed (the most recently closed tab or window will be at index 0). The entries may contain either tabs or windows.
             */
        getRecentlyClosed(filter: chrome.sessions.Filter): Promise<chrome.sessions.Session[]>;
        /**
             * Gets the list of recently closed tabs and/or windows.
             * @param callback
             * Parameter sessions: The list of closed entries in reverse order that they were closed (the most recently closed tab or window will be at index 0). The entries may contain either tabs or windows.
             */
        getRecentlyClosed(): Promise<chrome.sessions.Session[]>;
        /**
             * Retrieves all devices with synced sessions.
             * @param callback
             * Parameter devices: The list of sessions.Device objects for each synced session, sorted in order from device with most recently modified session to device with least recently modified session. tabs.Tab objects are sorted by recency in the windows.Window of the sessions.Session objects.
             */
        getDevices(filter: chrome.sessions.Filter): Promise<chrome.sessions.Device[]>;
        /**
             * Retrieves all devices with synced sessions.
             * @param callback
             * Parameter devices: The list of sessions.Device objects for each synced session, sorted in order from device with most recently modified session to device with least recently modified session. tabs.Tab objects are sorted by recency in the windows.Window of the sessions.Session objects.
             */
        getDevices(): Promise<chrome.sessions.Device[]>;
        /**
             * Reopens a windows.Window or tabs.Tab, with an optional callback to run when the entry has been restored.
             * @param sessionId Optional.
             * The windows.Window.sessionId, or tabs.Tab.sessionId to restore. If this parameter is not specified, the most recently closed session is restored.
             * @param callback Optional.
             * Parameter restoredSession: A sessions.Session containing the restored windows.Window or tabs.Tab object.
             */
        restore(sessionId?: string): Promise<chrome.sessions.Session>;
    }
    /**
     * Use the chrome.storage API to store, retrieve, and track changes to user data.
     * Permissions:  "storage"
     * @since Chrome 20.
     */
    export interface Storage {
    }
    export interface Socket {
        create(type: string, options?: Object): Promise<chrome.socket.CreateInfo>;
        connect(socketId: number, hostname: string, port: number): Promise<number>;
        bind(socketId: number, address: string, port: number): Promise<number>;
        read(socketId: number, bufferSize?: number): Promise<chrome.socket.ReadInfo>;
        write(socketId: number, data: ArrayBuffer): Promise<chrome.socket.WriteInfo>;
        recvFrom(socketId: number, bufferSize?: number): Promise<chrome.socket.RecvFromInfo>;
        sendTo(socketId: number, data: ArrayBuffer, address: string, port: number): Promise<chrome.socket.WriteInfo>;
        listen(socketId: number, address: string, port: number, backlog?: number): Promise<number>;
        accept(socketId: number): Promise<chrome.socket.AcceptInfo>;
        setKeepAlive(socketId: number, enable: boolean, delay?: number): Promise<boolean>;
        setNoDelay(socketId: number, noDelay: boolean): Promise<boolean>;
        getInfo(socketId: number): Promise<chrome.socket.SocketInfo>;
        getNetworkList(): Promise<chrome.socket.NetworkInterface[]>;
    }
    /**
     * Use the chrome.tabCapture API to interact with tab media streams.
     * Permissions:  "tabCapture"
     * @since Chrome 31.
     */
    export interface TabCapture {
        /**
             * Captures the visible area of the currently active tab. Capture can only be started on the currently active tab after the extension has been invoked. Capture is maintained across page navigations within the tab, and stops when the tab is closed, or the media stream is closed by the extension.
             * @param options Configures the returned media stream.
             * @param callback Callback with either the tab capture stream or null.
             */
        capture(options: chrome.tabCapture.CaptureOptions): Promise<MediaStream | null>;
        /**
             * Returns a list of tabs that have requested capture or are being captured, i.e. status != stopped and status != error. This allows extensions to inform the user that there is an existing tab capture that would prevent a new tab capture from succeeding (or to prevent redundant requests for the same tab).
             * @param callback Callback invoked with CaptureInfo[] for captured tabs.
             */
        getCapturedTabs(): Promise<chrome.tabCapture.CaptureInfo[]>;
    }
    /**
     * Use the chrome.tabs API to interact with the browser's tab system. You can use this API to create, modify, and rearrange tabs in the browser.
     * Permissions: The majority of the chrome.tabs API can be used without declaring any permission. However, the "tabs" permission is required in order to populate the url, title, and favIconUrl properties of Tab.
     * @since Chrome 5.
     */
    export interface Tabs {
        /**
             * Injects JavaScript code into a page. For details, see the programmatic injection section of the content scripts doc.
             * @param details Details of the script or CSS to inject. Either the code or the file property must be set, but both may not be set at the same time.
             * @param callback Optional. Called after all the JavaScript has been executed.
             * Parameter result: The result of the script in every injected frame.
             */
        executeScript(details: chrome.tabs.InjectDetails): Promise<any[]>;
        /**
             * Injects JavaScript code into a page. For details, see the programmatic injection section of the content scripts doc.
             * @param tabId Optional. The ID of the tab in which to run the script; defaults to the active tab of the current window.
             * @param details Details of the script or CSS to inject. Either the code or the file property must be set, but both may not be set at the same time.
             * @param callback Optional. Called after all the JavaScript has been executed.
             * Parameter result: The result of the script in every injected frame.
             */
        executeScript(tabId: number, details: chrome.tabs.InjectDetails): Promise<any[]>;
        /** Retrieves details about the specified tab. */
        get(tabId: number): Promise<chrome.tabs.Tab>;
        /**
             * Gets details about all tabs in the specified window.
             * @deprecated since Chrome 33. Please use tabs.query {windowId: windowId}.
             */
        getAllInWindow(): Promise<chrome.tabs.Tab>;
        /**
             * Gets details about all tabs in the specified window.
             * @deprecated since Chrome 33. Please use tabs.query {windowId: windowId}.
             * @param windowId Optional. Defaults to the current window.
             */
        getAllInWindow(windowId: number): Promise<chrome.tabs.Tab>;
        /** Gets the tab that this script call is being made from. May be undefined if called from a non-tab context (for example: a background page or popup view). */
        getCurrent(): Promise<chrome.tabs.Tab>;
        /**
             * Gets the tab that is selected in the specified window.
             * @deprecated since Chrome 33. Please use tabs.query {active: true}.
             */
        getSelected(): Promise<chrome.tabs.Tab>;
        /**
             * Gets the tab that is selected in the specified window.
             * @deprecated since Chrome 33. Please use tabs.query {active: true}.
             * @param windowId Optional. Defaults to the current window.
             */
        getSelected(windowId: number): Promise<chrome.tabs.Tab>;
        /**
             * Creates a new tab.
             * @param callback Optional.
             * Parameter tab: Details about the created tab. Will contain the ID of the new tab.
             */
        create(createProperties: chrome.tabs.CreateProperties): Promise<chrome.tabs.Tab>;
        /**
             * Moves one or more tabs to a new position within its window, or to a new window. Note that tabs can only be moved to and from normal (window.type === "normal") windows.
             * @param tabId The tab to move.
             * @param callback Optional.
             * Parameter tab: Details about the moved tab.
             */
        move(tabId: number, moveProperties: chrome.tabs.MoveProperties): Promise<chrome.tabs.Tab>;
        /**
             * Moves one or more tabs to a new position within its window, or to a new window. Note that tabs can only be moved to and from normal (window.type === "normal") windows.
             * @param tabIds The tabs to move.
             * @param callback Optional.
             * Parameter tabs: Details about the moved tabs.
             */
        move(tabIds: number[], moveProperties: chrome.tabs.MoveProperties): Promise<chrome.tabs.Tab[]>;
        /**
             * Modifies the properties of a tab. Properties that are not specified in updateProperties are not modified.
             * @param callback Optional.
             * Optional parameter tab: Details about the updated tab. The tabs.Tab object doesn't contain url, title and favIconUrl if the "tabs" permission has not been requested.
             */
        update(updateProperties: chrome.tabs.UpdateProperties): Promise<chrome.tabs.Tab>;
        /**
             * Modifies the properties of a tab. Properties that are not specified in updateProperties are not modified.
             * @param tabId Defaults to the selected tab of the current window.
             * @param callback Optional.
             * Optional parameter tab: Details about the updated tab. The tabs.Tab object doesn't contain url, title and favIconUrl if the "tabs" permission has not been requested.
             */
        update(tabId: number, updateProperties: chrome.tabs.UpdateProperties): Promise<chrome.tabs.Tab>;
        /**
             * Closes a tab.
             * @param tabId The tab to close.
             */
        remove(tabId: number): Promise<void>;
        /**
             * Closes several tabs.
             * @param tabIds The list of tabs to close.
             */
        remove(tabIds: number[]): Promise<void>;
        /**
             * Captures the visible area of the currently active tab in the specified window. You must have <all_urls> permission to use this method.
             * @param callback
             * Parameter dataUrl: A data URL which encodes an image of the visible area of the captured tab. May be assigned to the 'src' property of an HTML Image element for display.
             */
        captureVisibleTab(): Promise<string>;
        /**
             * Captures the visible area of the currently active tab in the specified window. You must have <all_urls> permission to use this method.
             * @param windowId Optional. The target window. Defaults to the current window.
             * @param callback
             * Parameter dataUrl: A data URL which encodes an image of the visible area of the captured tab. May be assigned to the 'src' property of an HTML Image element for display.
             */
        captureVisibleTab(windowId: number): Promise<string>;
        /**
             * Captures the visible area of the currently active tab in the specified window. You must have <all_urls> permission to use this method.
             * @param options Optional. Details about the format and quality of an image.
             * @param callback
             * Parameter dataUrl: A data URL which encodes an image of the visible area of the captured tab. May be assigned to the 'src' property of an HTML Image element for display.
             */
        captureVisibleTab(options: chrome.tabs.CaptureVisibleTabOptions): Promise<string>;
        /**
             * Captures the visible area of the currently active tab in the specified window. You must have <all_urls> permission to use this method.
             * @param windowId Optional. The target window. Defaults to the current window.
             * @param options Optional. Details about the format and quality of an image.
             * @param callback
             * Parameter dataUrl: A data URL which encodes an image of the visible area of the captured tab. May be assigned to the 'src' property of an HTML Image element for display.
             */
        captureVisibleTab(windowId: number, options: chrome.tabs.CaptureVisibleTabOptions): Promise<string>;
        /**
             * Reload a tab.
             * @since Chrome 16.
             * @param tabId The ID of the tab to reload; defaults to the selected tab of the current window.
             */
        reload(tabId: number, reloadProperties?: chrome.tabs.ReloadProperties): Promise<void>;
        /**
             * Reload the selected tab of the current window.
             * @since Chrome 16.
             */
        reload(reloadProperties: chrome.tabs.ReloadProperties): Promise<void>;
        /**
             * Reload the selected tab of the current window.
              * @since Chrome 16.
             */
        reload(): Promise<void>;
        /**
             * Duplicates a tab.
             * @since Chrome 23.
             * @param tabId The ID of the tab which is to be duplicated.
             * @param callback Optional.
             * Optional parameter tab: Details about the duplicated tab. The tabs.Tab object doesn't contain url, title and favIconUrl if the "tabs" permission has not been requested.
             */
        duplicate(tabId: number): Promise<chrome.tabs.Tab>;
        /**
             * Injects CSS into a page. For details, see the programmatic injection section of the content scripts doc.
             * @param details Details of the script or CSS to inject. Either the code or the file property must be set, but both may not be set at the same time.
             * @param callback Optional. Called when all the CSS has been inserted.
             */
        insertCSS(details: chrome.tabs.InjectDetails): Promise<void>;
        /**
             * Injects CSS into a page. For details, see the programmatic injection section of the content scripts doc.
             * @param tabId Optional. The ID of the tab in which to insert the CSS; defaults to the active tab of the current window.
             * @param details Details of the script or CSS to inject. Either the code or the file property must be set, but both may not be set at the same time.
             * @param callback Optional. Called when all the CSS has been inserted.
             */
        insertCSS(tabId: number, details: chrome.tabs.InjectDetails): Promise<void>;
        /**
             * Highlights the given tabs.
             * @since Chrome 16.
             * @param callback Optional.
             * Parameter window: Contains details about the window whose tabs were highlighted.
             */
        highlight(highlightInfo: chrome.tabs.HighlightInfo): Promise<chrome.windows.Window>;
        /**
             * Gets all tabs that have the specified properties, or all tabs if no properties are specified.
             * @since Chrome 16.
             */
        query(queryInfo: chrome.tabs.QueryInfo): Promise<chrome.tabs.Tab[]>;
        /**
             * Detects the primary language of the content in a tab.
             * @param callback
             * Parameter language: An ISO language code such as en or fr. For a complete list of languages supported by this method, see kLanguageInfoTable. The 2nd to 4th columns will be checked and the first non-NULL value will be returned except for Simplified Chinese for which zh-CN will be returned. For an unknown language, und will be returned.
             */
        detectLanguage(): Promise<string>;
        /**
             * Detects the primary language of the content in a tab.
             * @param tabId Optional. Defaults to the active tab of the current window.
             * @param callback
             * Parameter language: An ISO language code such as en or fr. For a complete list of languages supported by this method, see kLanguageInfoTable. The 2nd to 4th columns will be checked and the first non-NULL value will be returned except for Simplified Chinese for which zh-CN will be returned. For an unknown language, und will be returned.
             */
        detectLanguage(tabId: number): Promise<string>;
        /**
             * Zooms a specified tab.
             * @since Chrome 42.
             * @param zoomFactor The new zoom factor. Use a value of 0 here to set the tab to its current default zoom factor. Values greater than zero specify a (possibly non-default) zoom factor for the tab.
             * @param callback Optional. Called after the zoom factor has been changed.
             */
        setZoom(zoomFactor: number): Promise<void>;
        /**
             * Zooms a specified tab.
             * @since Chrome 42.
             * @param tabId Optional. The ID of the tab to zoom; defaults to the active tab of the current window.
             * @param zoomFactor The new zoom factor. Use a value of 0 here to set the tab to its current default zoom factor. Values greater than zero specify a (possibly non-default) zoom factor for the tab.
             * @param callback Optional. Called after the zoom factor has been changed.
             */
        setZoom(tabId: number, zoomFactor: number): Promise<void>;
        /**
             * Gets the current zoom factor of a specified tab.
             * @since Chrome 42.
             * @param callback Called with the tab's current zoom factor after it has been fetched.
             * Parameter zoomFactor: The tab's current zoom factor.
             */
        getZoom(): Promise<number>;
        /**
             * Gets the current zoom factor of a specified tab.
             * @since Chrome 42.
             * @param tabId Optional. The ID of the tab to get the current zoom factor from; defaults to the active tab of the current window.
             * @param callback Called with the tab's current zoom factor after it has been fetched.
             * Parameter zoomFactor: The tab's current zoom factor.
             */
        getZoom(tabId: number): Promise<number>;
        /**
             * Sets the zoom settings for a specified tab, which define how zoom changes are handled. These settings are reset to defaults upon navigating the tab.
             * @since Chrome 42.
             * @param zoomSettings Defines how zoom changes are handled and at what scope.
             * @param callback Optional. Called after the zoom settings have been changed.
             */
        setZoomSettings(zoomSettings: chrome.tabs.ZoomSettings): Promise<void>;
        /**
             * Sets the zoom settings for a specified tab, which define how zoom changes are handled. These settings are reset to defaults upon navigating the tab.
             * @since Chrome 42.
             * @param tabId Optional. The ID of the tab to change the zoom settings for; defaults to the active tab of the current window.
             * @param zoomSettings Defines how zoom changes are handled and at what scope.
             * @param callback Optional. Called after the zoom settings have been changed.
             */
        setZoomSettings(tabId: number, zoomSettings: chrome.tabs.ZoomSettings): Promise<void>;
        /**
             * Gets the current zoom settings of a specified tab.
             * @since Chrome 42.
             * @param callback Called with the tab's current zoom settings.
             * Paramater zoomSettings: The tab's current zoom settings.
             */
        getZoomSettings(): Promise<chrome.tabs.ZoomSettings>;
        /**
             * Gets the current zoom settings of a specified tab.
             * @since Chrome 42.
             * @param tabId Optional. The ID of the tab to get the current zoom settings from; defaults to the active tab of the current window.
             * @param callback Called with the tab's current zoom settings.
             * Paramater zoomSettings: The tab's current zoom settings.
             */
        getZoomSettings(tabId: number): Promise<chrome.tabs.ZoomSettings>;
    }
    /**
     * Use the chrome.topSites API to access the top sites that are displayed on the new tab page.
     * Permissions:  "topSites"
     * @since Chrome 19.
     */
    export interface TopSites {
        /** Gets a list of top sites. */
        get(): Promise<chrome.topSites.MostVisitedURL[]>;
    }
    /**
     * Use the chrome.tts API to play synthesized text-to-speech (TTS). See also the related ttsEngine API, which allows an extension to implement a speech engine.
     * Permissions:  "tts"
     * @since Chrome 14.
     */
    export interface Tts {
        /** Checks whether the engine is currently speaking. On Mac OS X, the result is true whenever the system speech engine is speaking, even if the speech wasn't initiated by Chrome. */
        isSpeaking(): Promise<boolean>;
        /** Gets an array of all available voices. */
        getVoices(): Promise<chrome.tts.TtsVoice[]>;
        /**
             * Speaks text using a text-to-speech engine.
             * @param utterance The text to speak, either plain text or a complete, well-formed SSML document. Speech engines that do not support SSML will strip away the tags and speak the text. The maximum length of the text is 32,768 characters.
             * @param callback Optional. Called right away, before speech finishes. Check chrome.runtime.lastError to make sure there were no errors. Use options.onEvent to get more detailed feedback.
             */
        speak(utterance: string): Promise<void>;
        /**
             * Speaks text using a text-to-speech engine.
             * @param utterance The text to speak, either plain text or a complete, well-formed SSML document. Speech engines that do not support SSML will strip away the tags and speak the text. The maximum length of the text is 32,768 characters.
             * @param options Optional. The speech options.
             * @param callback Optional. Called right away, before speech finishes. Check chrome.runtime.lastError to make sure there were no errors. Use options.onEvent to get more detailed feedback.
             */
        speak(utterance: string, options: chrome.tts.SpeakOptions): Promise<void>;
    }
    /**
     * Use the chrome.ttsEngine API to implement a text-to-speech(TTS) engine using an extension. If your extension registers using this API, it will receive events containing an utterance to be spoken and other parameters when any extension or Chrome App uses the tts API to generate speech. Your extension can then use any available web technology to synthesize and output the speech, and send events back to the calling function to report the status.
     * Permissions:  "ttsEngine"
     * @since Chrome 14.
     */
    export interface TtsEngine {
    }
    /**
     * The chrome.types API contains type declarations for Chrome.
     * @since Chrome 13.
     */
    export interface Types {
    }
    /**
     * Use the chrome.vpnProvider API to implement a VPN client.
     * Permissions:  "vpnProvider"
     * Important: This API works only on Chrome OS.
     * @since Chrome 43.
     */
    export interface VpnProvider {
        /**
             * Creates a new VPN configuration that persists across multiple login sessions of the user.
             * @param name The name of the VPN configuration.
             * @param callback Called when the configuration is created or if there is an error.
             * Parameter id: A unique ID for the created configuration, empty string on failure.
             */
        createConfig(name: string): Promise<string>;
        /**
             * Destroys a VPN configuration created by the extension.
             * @param id ID of the VPN configuration to destroy.
             * @param callback Optional. Called when the configuration is destroyed or if there is an error.
             */
        destroyConfig(id: string): Promise<void>;
        /**
             * Sets the parameters for the VPN session. This should be called immediately after "connected" is received from the platform. This will succeed only when the VPN session is owned by the extension.
             * @param parameters The parameters for the VPN session.
             * @param callback Called when the parameters are set or if there is an error.
             */
        setParameters(parameters: chrome.vpnProvider.VpnSessionParameters): Promise<void>;
        /**
             * Sends an IP packet through the tunnel created for the VPN session. This will succeed only when the VPN session is owned by the extension.
             * @param data The IP packet to be sent to the platform.
             * @param callback Optional. Called when the packet is sent or if there is an error.
             */
        sendPacket(data: ArrayBuffer): Promise<void>;
        /**
             * Notifies the VPN session state to the platform. This will succeed only when the VPN session is owned by the extension.
             * @param state The VPN session state of the VPN client.
             * connected: VPN connection was successful.
             * failure: VPN connection failed.
             * @param callback Optional. Called when the notification is complete or if there is an error.
             */
        notifyConnectionStateChanged(state: string): Promise<void>;
    }
    /**
     * Use the chrome.wallpaper API to change the ChromeOS wallpaper.
     * Permissions:  "wallpaper"
     * Important: This API works only on Chrome OS.
     * @since Chrome 43.
     */
    export interface Wallpaper {
        /**
             * Sets wallpaper to the image at url or wallpaperData with the specified layout
             * @param callback
             * Optional parameter thumbnail: The jpeg encoded wallpaper thumbnail. It is generated by resizing the wallpaper to 128x60.
             */
        setWallpaper(details: chrome.wallpaper.WallpaperDetails): Promise<any>;
    }
    /**
     * Use the chrome.webNavigation API to receive notifications about the status of navigation requests in-flight.
     * Permissions:  "webNavigation"
     * @since Chrome 16.
     */
    export interface WebNavigation {
        /**
             * Retrieves information about the given frame. A frame refers to an <iframe> or a <frame> of a web page and is identified by a tab ID and a frame ID.
             * @param details Information about the frame to retrieve information about.
             * @param callback
             * Optional parameter details: Information about the requested frame, null if the specified frame ID and/or tab ID are invalid.
             */
        getFrame(details: chrome.webNavigation.GetFrameDetails): Promise<chrome.webNavigation.GetFrameResultDetails | null>;
        /**
             * Retrieves information about all frames of a given tab.
             * @param details Information about the tab to retrieve all frames from.
             * @param callback
             * Optional parameter details: A list of frames in the given tab, null if the specified tab ID is invalid.
             */
        getAllFrames(details: chrome.webNavigation.GetAllFrameDetails): Promise<chrome.webNavigation.GetAllFrameResultDetails[] | null>;
    }
    /**
     * Use the chrome.webRequest API to observe and analyze traffic and to intercept, block, or modify requests in-flight.
     * Permissions:  "webRequest", host permissions
     * @since Chrome 17.
     */
    export interface WebRequest {
        /** Needs to be called when the behavior of the webRequest handlers has changed to prevent incorrect handling due to caching. This function call is expensive. Don't call it often. */
        handlerBehaviorChanged(): Promise<void>;
    }
    /**
     * Use the chrome.webstore API to initiate app and extension installations "inline" from your site.
     * @since Chrome 15.
     */
    export interface Webstore {
    }
    /**
     * Use the chrome.windows API to interact with browser windows. You can use this API to create, modify, and rearrange windows in the browser.
     * Permissions: The chrome.windows API can be used without declaring any permission. However, the "tabs" permission is required in order to populate the url, title, and favIconUrl properties of Tab objects.
     * @since Chrome 5.
     */
    export interface Windows {
        /** Gets details about a window. */
        get(windowId: number): Promise<chrome.windows.Window>;
        /**
             * Gets details about a window.
             * @since Chrome 18.
             */
        get(windowId: number, getInfo: chrome.windows.GetInfo): Promise<chrome.windows.Window>;
        /**
             * Gets the current window.
             */
        getCurrent(): Promise<chrome.windows.Window>;
        /**
             * Gets the current window.
             * @since Chrome 18.
             */
        getCurrent(getInfo: chrome.windows.GetInfo): Promise<chrome.windows.Window>;
        /**
             * Creates (opens) a new browser with any optional sizing, position or default URL provided.
             * @param callback
             * Optional parameter window: Contains details about the created window.
             */
        create(): Promise<chrome.windows.Window>;
        /**
             * Creates (opens) a new browser with any optional sizing, position or default URL provided.
             * @param callback
             * Optional parameter window: Contains details about the created window.
             */
        create(createData: chrome.windows.CreateData): Promise<chrome.windows.Window>;
        /**
             * Gets all windows.
             */
        getAll(): Promise<chrome.windows.Window[]>;
        /**
             * Gets all windows.
             * @since Chrome 18.
             */
        getAll(getInfo: chrome.windows.GetInfo): Promise<chrome.windows.Window[]>;
        /** Updates the properties of a window. Specify only the properties that you want to change; unspecified properties will be left unchanged. */
        update(windowId: number, updateInfo: chrome.windows.UpdateInfo): Promise<chrome.windows.Window>;
        /** Removes (closes) a window, and all the tabs inside it. */
        remove(windowId: number): Promise<void>;
        /**
             * Gets the window that was most recently focused — typically the window 'on top'.
             */
        getLastFocused(): Promise<chrome.windows.Window>;
        /**
             * Gets the window that was most recently focused — typically the window 'on top'.
             * @since Chrome 18.
             */
        getLastFocused(getInfo: chrome.windows.GetInfo): Promise<chrome.windows.Window>;
    }
}
/// <reference types="filesystem" />
/// <reference types="chrome" />

