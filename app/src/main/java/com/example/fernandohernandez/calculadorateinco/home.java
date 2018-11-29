package com.example.fernandohernandez.calculadorateinco;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.KeyEvent;
import android.view.WindowManager;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;


public class home extends AppCompatActivity {
    private static final int INTERVALO = 2000; //2 segundos para salir
    private long tiempoPrimerClick;
    WebView webViewRulles;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.web_view);

        webViewRulles = (WebView) this.findViewById(R.id.webViewRulles);
        WebSettings webSettings = webViewRulles.getSettings();
        webViewRulles.setInitialScale(1);
        webSettings.setUseWideViewPort(true);
        webSettings.setLoadWithOverviewMode(true);
        webSettings.setJavaScriptEnabled(true);
        webViewRulles.loadUrl("file:///android_asset/index.html");
        webViewRulles.setWebViewClient(new WebViewClient());

        //pantalla completa
        getSupportActionBar().hide();
        this.getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
    }

    @Override
    public void onBackPressed(){
        if (tiempoPrimerClick + INTERVALO > System.currentTimeMillis()){
            super.onBackPressed();
            return;
        }else {
            Toast.makeText(this, "Vuelve a presionar para salir", Toast.LENGTH_SHORT).show();
        }
        tiempoPrimerClick = System.currentTimeMillis();
    }
}
