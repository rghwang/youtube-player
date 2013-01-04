// 스냅뷰에서 전체화면 전환시 영상 끊기는 문제

// 스냅뷰 상태에서 전체화면 눌렀을 때 처리
// 1. 스냅뷰 강제 해제+전체화면

(function () {
    "use strict";

    var appViewState = Windows.UI.ViewManagement.ApplicationViewState;
    var binding = WinJS.Binding;
    var nav = WinJS.Navigation;
    var ui = WinJS.UI;
    var utils = WinJS.Utilities;
    var dtm = Windows.ApplicationModel.DataTransfer.DataTransferManager;
    var selectedItem = null;

    ui.Pages.define("/pages/split/split.html", {

        /// <field type="WinJS.Binding.List" />
        _items: null,
        _group: null,
        _itemSelectionIndex: -1,
        videoFullScreen: false,
        playerWidth:0,
        playerHeight: 0,
        backbutton: null,
        backbuttonHandler: null,
        GRID_COLUMNS_VIDEO_FULLSCREEN: "86px 0px 0px 1fr",
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            var listView = element.querySelector(".itemlist").winControl;

            // Store information about the group and selection that this page will
            // display.
            this._group = (options && options.groupKey) ? Data.resolveGroupReference(options.groupKey) : Data.groups.getAt(0);
            this._items = Data.getItemsFromGroup(this._group);
            this._itemSelectionIndex = (options && "selectedIndex" in options) ? options.selectedIndex : -1;

            element.querySelector("header[role=banner] .pagetitle").textContent = this._group.title;

            // Set up the ListView.
            listView.itemDataSource = this._items.dataSource;
            listView.itemTemplate = element.querySelector(".itemtemplate");
            listView.onselectionchanged = this._selectionChanged.bind(this);
            listView.layout = new ui.ListLayout();

            this._updateVisibility();
            if (this._isSingleColumn()) {
                if (this._itemSelectionIndex >= 0) {
                    // For single-column detail view, load the article.

                    binding.processAll(element.querySelector(".articlesection"), selectedItem);

                    var ifrm = document.getElementById("player");

                    var vid = selectedItem.videoId;
                    var embed_url = "http://www.youtube.com/embed/" + vid + "?enablejsapi=1&rel=0&showinfo=0&autoplay=1&";
                    if (vid) {
                        ifrm.src = embed_url;
                        ifrm.width = this.playerWidth = window.getComputedStyle(document.querySelector(".articlesection")).width;
                        ifrm.height = this.playerHeight = ifrm.width * 390 / 640 + 90;
                    } else {
                        ifrm.src = "/pages/blank/blank.html";
                    }


                }
            } else {
                if (nav.canGoBack && nav.history.backStack[nav.history.backStack.length - 1].location === "/pages/split/split.html") {
                    // Clean up the backstack to handle a user snapping, navigating
                    // away, unsnapping, and then returning to this page.
                    nav.history.backStack.pop();
                }
                // If this page has a selectionIndex, make that selection
                // appear in the ListView.
                listView.selection.set(Math.max(this._itemSelectionIndex, 0));
            }

            // workaround for removing youtube player.
            if (nav._back == null) nav._back = nav.back;
            nav.back = function () {
                var ifrm = document.getElementById("player");
                ifrm.src = "/pages/blank/blank.html";
                ifrm.onload = function () {
                    nav.back = nav._back;
                    nav._back = null;
                    nav.back();
                }
            }
            var _this = this;
            document.getElementById("fullscreen_btn").addEventListener("click", this.forceFullScreen.bind(this));

            dtm.getForCurrentView().addEventListener("datarequested", this.onDataRequested);
        },
        forceFullScreen: function () {
            if (this._isSingleColumn()) {
                var m = new Windows.UI.Popups.MessageDialog("스냅뷰, 포트레이트 모드를 기본 모드로 변경한 후에 전체화면을 실행해주세요.");
                m.showAsync();
                return false;
            }
            this.videoFullScreen = true;
            //-ms-grid-columns: 106px 534px 50px 1fr;
            var grid = document.querySelector(".splitpage");
            grid.style.msGridColumns = this.GRID_COLUMNS_VIDEO_FULLSCREEN;
            var player = document.getElementById("player");
            this.playerWidth = player.width;
            this.playerHeight = player.height;
            player.width = document.body.clientWidth - 106;
            player.height = document.body.clientHeight;
            player.style.display = "block";
            player.style.position = "absolute";
            player.style.top = "0px";
            player.style.left = "0px";
            this.backbutton = document.querySelector(".win-backbutton");
            this.backbuttonHandler = this.backbutton.onclick;
                
            this.backbutton.onclick = this.restoreFullScreen.bind(this);

        },
        restoreFullScreen: function () {
            this.videoFullScreen = false;
            var grid = document.querySelector(".splitpage");
            delete grid.style.removeProperty("-ms-grid-columns");

            var player = document.getElementById("player");
            player.width = this.playerWidth;
            player.height = this.playerHeight;
            player.style.display = "block";
            player.style.position = "relative";
            this.backbutton.onclick = this.backbuttonHandler;
        },
        onDataRequested: function (e) {
            var request = e.request;
            request.data.properties.title = selectedItem.title;
            request.data.properties.description = selectedItem.description;
            if (selectedItem.videoId == undefined || selectedItem.videoId == "")
                request.data.setHtmlFormat(Windows.ApplicationModel.DataTransfer.HtmlFormatHelper.createHtmlFormat(selectedItem.content));
            else {
                request.data.setUri(new Windows.Foundation.Uri("http://www.youtube.com/watch?v=" + selectedItem.videoId));
            }
        },

        unload: function () {
            this._items.dispose();
        },

        // This function updates the page layout in response to viewState changes.
        updateLayout: function (element, viewState, lastViewState) {
            /// <param name="element" domElement="true" />

            if(this.videoFullScreen) this.restoreFullScreen();

            var listView = element.querySelector(".itemlist").winControl;
            var firstVisible = listView.indexOfFirstVisible;
            this._updateVisibility();

            var handler = function (e) {
                listView.removeEventListener("contentanimating", handler, false);
                e.preventDefault();
            }

            if (this._isSingleColumn()) {

                listView.selection.clear();
                if (this._itemSelectionIndex >= 0) {
                    // If the app has snapped into a single-column detail view,
                    // add the single-column list view to the backstack.
                    nav.history.current.state = {
                        groupKey: this._group.key,
                        selectedIndex: this._itemSelectionIndex
                    };
                    nav.history.backStack.push({
                        location: "/pages/split/split.html",
                        state: { groupKey: this._group.key }
                    });
                    element.querySelector(".articlesection").focus();

                    var ifrm = document.getElementById("player");

                    if (viewState === Windows.UI.ViewManagement.ApplicationViewState.snapped) {
                        ifrm.width = 280;
                        ifrm.height = 260;
                    } else {
                        ifrm.src = ifrm.src;
                    }


                } else {
                    listView.addEventListener("contentanimating", handler, false);
                    if (firstVisible >= 0 && listView.itemDataSource.list.length > 0) {
                        listView.indexOfFirstVisible = firstVisible;
                    }
                    listView.forceLayout();
                }
            } else {
                // If the app has unsnapped into the two-column view, remove any
                // splitPage instances that got added to the backstack.
                if (nav.canGoBack && nav.history.backStack[nav.history.backStack.length - 1].location === "/pages/split/split.html") {
                    nav.history.backStack.pop();
                }
                if (viewState !== lastViewState) {
                    listView.addEventListener("contentanimating", handler, false);
                    if (firstVisible >= 0 && listView.itemDataSource.list.length > 0) {
                        listView.indexOfFirstVisible = firstVisible;
                    }
                    listView.forceLayout();
                }

                listView.selection.set(this._itemSelectionIndex >= 0 ? this._itemSelectionIndex : Math.max(firstVisible, 0));
            }
        },

        // This function checks if the list and details columns should be displayed
        // on separate pages instead of side-by-side.
        _isSingleColumn: function () {
            var viewState = Windows.UI.ViewManagement.ApplicationView.value;
            return (viewState === appViewState.snapped || viewState === appViewState.fullScreenPortrait);
        },

        _selectionChanged: function (args) {
            var listView = document.body.querySelector(".itemlist").winControl;
            var details;
            // By default, the selection is restriced to a single item.
            listView.selection.getItems().done(function updateDetails(items) {
                if (items.length > 0) {
                    this._itemSelectionIndex = items[0].index;

                    if (this._itemSelectionIndex >= 0)
                        selectedItem = this._items.getAt(this._itemSelectionIndex);
                    else
                        selectedItem = this._items.getAt(0);

                    if (this._isSingleColumn()) {
                        // If snapped or portrait, navigate to a new page containing the
                        // selected item's details.
                        nav.navigate("/pages/split/split.html", { groupKey: this._group.key, selectedIndex: this._itemSelectionIndex });

                    } else {
                        // If fullscreen or filled, update the details column with new data.
                        details = document.querySelector(".articlesection");
                        binding.processAll(details, items[0].data);
                        details.scrollTop = 0;

                        var ifrm = document.getElementById("player");

                        var vid = items[0].data.videoId;
                        var embed_url = "http://www.youtube.com/embed/" + vid + "?enablejsapi=1&rel=0&showinfo=0&autoplay=1&";
                        if (vid) {
                            ifrm.src = embed_url;
                            ifrm.width = window.getComputedStyle(document.querySelector(".articlesection")).width;
                            ifrm.height = ifrm.width * 390 / 640;
                        } else {
                            ifrm.src = "/pages/blank/blank.html";
                        }
                    }
                }
            }.bind(this));
        },

        // This function toggles visibility of the two columns based on the current
        // view state and item selection.
        _updateVisibility: function () {

            var oldPrimary = document.querySelector(".primarycolumn");
            if (oldPrimary) {
                utils.removeClass(oldPrimary, "primarycolumn");
            }
            if (this._isSingleColumn()) {
                if (this._itemSelectionIndex >= 0) {
                    utils.addClass(document.querySelector(".articlesection"), "primarycolumn");
                    document.querySelector(".articlesection").focus();
                } else {
                    utils.addClass(document.querySelector(".itemlistsection"), "primarycolumn");
                    document.querySelector(".itemlist").focus();
                }
            } else {
                document.querySelector(".itemlist").focus();
            }
        }
    });

})();
