package com.suvarnakardiary;

import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Set the layout for the activity
        setContentView(R.layout.activity_main);

        // Initialize the WebView
        WebView webView = findViewById(R.id.webview);
//        if (BuildConfig.DEBUG) {
//            WebView.setWebContentsDebuggingEnabled(true);
//        }

        // Check if the WebView is initialized successfully
        if (webView != null) {
            // Enable pinch-to-zoom and other WebView settings
            WebSettings webSettings = webView.getSettings();
            webSettings.setJavaScriptEnabled(true);
            webSettings.setBuiltInZoomControls(true);
            webSettings.setDisplayZoomControls(false);
            webSettings.setSupportZoom(true);
            webSettings.setAllowFileAccess(true);
            webSettings.setAllowFileAccessFromFileURLs(true);
            webSettings.setDomStorageEnabled(true);
            webSettings.setAllowContentAccess(true);

            // Load the local HTML file
            webView.loadUrl("file:///android_asset/index.html");
            webView.setWebViewClient(new WebViewClient());
        } else {
            // Log an error or handle it in a way that helps debug
            System.out.println("WebView initialization failed.");
        }
    }
}
