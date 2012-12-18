// For an introduction to the Split template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=232447
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    var nav = WinJS.Navigation;


    function onSettingsCommand(e) {
        var uri = Windows.Foundation.Uri("http://uxfactory.tistory.com/10");
        Windows.System.Launcher.launchUriAsync(uri).then(
            function (success) {
                if (success) {

                } else {

                }
            }
        );
    }
    function onCommandsRequested(e) {
        var settingsCommand = new Windows.UI.ApplicationSettings.SettingsCommand("privacy", "개인 정보 보호 정책", onSettingsCommand);
        e.request.applicationCommands.append(settingsCommand);
    }

    app.addEventListener("activated", function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.
            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
            }


            var settingsPane = Windows.UI.ApplicationSettings.SettingsPane.getForCurrentView();
            settingsPane.addEventListener("commandsrequested", onCommandsRequested);

            if (app.sessionState.history) {
                nav.history = app.sessionState.history;
            }
            args.setPromise(WinJS.UI.processAll().then(function () {
                if (nav.location) {
                    nav.history.current.initialPlaceholder = true;
                    return nav.navigate(nav.location, nav.state);
                } else {
                    return nav.navigate(Application.navigator.home);
                }
            }));
        }
    });

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. If you need to 
        // complete an asynchronous operation before your application is 
        // suspended, call args.setPromise().
        app.sessionState.history = nav.history;
    };

    app.start();



})();
