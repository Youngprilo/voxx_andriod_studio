package com.westminster.micah.voxx

import android.annotation.SuppressLint
import android.content.Context
import android.content.pm.PackageManager
import android.graphics.Bitmap
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.util.Log
import android.view.ViewGroup
import android.webkit.ConsoleMessage
import android.webkit.PermissionRequest
import android.webkit.WebChromeClient
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebSettings.LOAD_NO_CACHE
import android.webkit.WebView
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.viewinterop.AndroidView
import androidx.core.content.ContextCompat
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.LifecycleEventObserver
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.webkit.WebViewAssetLoader
import androidx.webkit.WebViewClientCompat
import androidx.lifecycle.Lifecycle.Event.*
import androidx.lifecycle.viewModelScope

@SuppressLint("SetJavaScriptEnabled")
fun appWebView (
    context: Context,
    url: String,
    savedInstanceState: Bundle?
) = WebView(context).apply {
    layoutParams = ViewGroup.LayoutParams(
        ViewGroup.LayoutParams.MATCH_PARENT,
        ViewGroup.LayoutParams.MATCH_PARENT)

    val assetLoader = WebViewAssetLoader.Builder().apply {
        addPathHandler("/", WebViewAssetLoader.AssetsPathHandler(context))
        addPathHandler("/assets/", WebViewAssetLoader.AssetsPathHandler(context))
    }.build()

    webViewClient = webViewClient(context, assetLoader)
    settings.javaScriptEnabled = true
    settings.domStorageEnabled = true
    settings.cacheMode = LOAD_NO_CACHE
    settings.mediaPlaybackRequiresUserGesture = false

    webChromeClient = webChromeClient()

    if (savedInstanceState !== null)
    {
        restoreState(savedInstanceState)
    }
    else
    {
        loadUrl(url)
    }
}


/**
 * Create a custom [WebViewClient]. It is responsible for most of the
 * actions that occur inside a WebView. For example allows you to
 *  - intercept url requests for special handling
 *  - dictate where a URL is loaded (in WebView or the default browser)
 *  - What to do for certain events like onPageFinished, onReceivedSslError,
 *    etc
 */
private fun webViewClient(context: Context, assetLoader: WebViewAssetLoader) = object : WebViewClientCompat()
{
    override fun onPageStarted(view: WebView?, url: String?, favicon: Bitmap?) {
        if (MainActivity.IS_AGENT_BUILD) {
            view?.evaluateJavascript("window.VOXX_AGENT_BUILD=true;") {}
        }

        super.onPageStarted(view, url, favicon)
    }

    override fun shouldInterceptRequest(
        view: WebView?,
        request: WebResourceRequest?
    ): WebResourceResponse? =
        request?.let {
            if (it.url.host == "appassets.androidplatform.net") {
                return assetLoader.shouldInterceptRequest(it.url)
            }

            return null
        }

    @Deprecated("Deprecated in Java", ReplaceWith(
        "assetLoader.shouldInterceptRequest(Uri.parse((url)))",
        "android.net.Uri"
    )
    )
    override fun shouldInterceptRequest(
        view: WebView?,
        url: String?
    ): WebResourceResponse? {
        var path = url;
        if (path == "/") {
            path = "/assets/index.html"
        }

        return assetLoader.shouldInterceptRequest(Uri.parse(path))
    }
}

private fun webChromeClient() = object : WebChromeClient()
{
    override fun onConsoleMessage(
        consoleMessage: ConsoleMessage
    ): Boolean
    {
        val messageLevel = consoleMessage.messageLevel()
        val logMessage = buildString {
            append("(")
            append(consoleMessage.sourceId().split("/","\\").last())
            append(": ")
            append(messageLevel)
            append(") Line number: ")
            append(consoleMessage.lineNumber())
            append("\n")
            append(consoleMessage.message())
        }
        if (messageLevel == null)
        {
            Log.i("WebViewConsole", logMessage)
            return false
        }
        when (messageLevel)
        {
            ConsoleMessage.MessageLevel.TIP,
            ConsoleMessage.MessageLevel.LOG ->
                Log.i("WebViewConsole", logMessage)
            ConsoleMessage.MessageLevel.WARNING ->
                Log.w("WebViewConsole", logMessage)
            ConsoleMessage.MessageLevel.ERROR ->
                Log.e("WebViewConsole", logMessage)
            ConsoleMessage.MessageLevel.DEBUG ->
                Log.d("WebViewConsole", logMessage)
        }
        return false
    }

    override fun onPermissionRequest(request: PermissionRequest) {
//        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
//            if (ContextCompat.checkSelfPermission(this@MainActivity, Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED) {
//                RxPermissions(this@YourActivity).request(Manifest.permission.CAMERA).subscribe({
//                    if (it) request.grant(request.resources)
//                }, {
//                    Timber.e(it, "Error requesting camera")
//                }).addSubscription()
//            } else {
//                request.grant(request.resources)
//            }
//        }
        request.grant(request.resources)
    }

//    override fun onPermissionRequest(request: PermissionRequest) {
//        Log.d("Voxx", request.origin.toString())
//
//        if (request.origin.authority == "file:///")  {
//            request.grant(request.resources)
//        } else {
//            request.deny()
//        }
//    }

    /*
    @Override
        public void onPermissionRequest(final PermissionRequest request) {
            Log.d(TAG, "onPermissionRequest");
            MainActivity.this.runOnUiThread(new Runnable() {
                @TargetApi(Build.VERSION_CODES.M)
                @Override
                public void run() {
                    Log.d(TAG, request.getOrigin().toString());
                    if(request.getOrigin().toString().equals("file:///")) {
                        Log.d(TAG, "GRANTED");
                        request.grant(request.getResources());
                    } else {
                        Log.d(TAG, "DENIED");
                        request.deny();
                    }
                }
            });
        }
    */
}

@Composable
fun WebViewContent (url: String) {
    // https://github.com/google/accompanist/issues/1178.
    var webView: WebView? by remember {
        mutableStateOf(null)
    }
    var savedBundle: Bundle? by rememberSaveable {
        mutableStateOf(null)
    }

    val lifecycle = androidx.compose.ui.platform.LocalLifecycleOwner.current.lifecycle

    DisposableEffect(lifecycle) {
        val saveState: (() -> Unit) -> Unit = { then ->
            val bundle = Bundle()
            // If the WebView exists, save its state
            webView?.apply {
                saveState(bundle)
                then()
            }
            savedBundle = bundle
        }
        val statePreservingObserver = LifecycleEventObserver { _, event ->
            Log.d("DisposableEffect", "Event occurring: ${event.name}")
            when (event) {
                ON_PAUSE, ON_STOP -> saveState {}
                ON_DESTROY -> saveState {
                }
                // Nothing needed on these events
                ON_CREATE, ON_RESUME, ON_START, ON_ANY -> {}
            }
        }

        lifecycle.addObserver(statePreservingObserver)

        onDispose {
            lifecycle.removeObserver(statePreservingObserver)
        }
    }

    AndroidView(
        factory = {
            appWebView(it, url, savedBundle).apply {
                webView = this
            }
        }
    )
}