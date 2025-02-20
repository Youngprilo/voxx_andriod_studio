package com.westminster.micah.voxx

import android.Manifest;
import android.content.pm.ActivityInfo
import android.content.pm.PackageManager
import android.content.res.Configuration
import android.os.Bundle
import android.util.Log
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.core.app.ActivityCompat
import androidx.core.view.WindowCompat
import androidx.core.view.WindowInsetsCompat
import androidx.core.view.WindowInsetsControllerCompat

class MainActivity : ComponentActivity() {
    companion object {
        @JvmStatic
        val IS_AGENT_BUILD = false
    }

    private fun makeFullscreen() {
        val windowInsetsController =
            WindowCompat.getInsetsController(window, window.decorView)
        // Configure the behavior of the hidden system bars.
        windowInsetsController.systemBarsBehavior =
            WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE

        windowInsetsController.hide(WindowInsetsCompat.Type.systemBars())
    }

    private fun ensurePermissions() {
        val audioPerm = ActivityCompat.checkSelfPermission(this, Manifest.permission.RECORD_AUDIO)
        val videoPerm = ActivityCompat.checkSelfPermission(this, Manifest.permission.CAMERA)

        if (audioPerm != PackageManager.PERMISSION_GRANTED || videoPerm != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this, arrayOf(Manifest.permission.CAMERA, Manifest.permission.RECORD_AUDIO), 123)
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        var url = "https://appassets.androidplatform.net/index.html"

        if (IS_AGENT_BUILD) {
            url = "https://appassets.androidplatform.net/agent.html"
        }

        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        makeFullscreen()
        ensurePermissions()
        setContent {
            WebViewContent(url)
        }
    }
}