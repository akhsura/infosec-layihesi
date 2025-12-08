from website import db, create_app
from website.models import BlogPost

app = create_app()


with app.app_context():
    posts = [
    BlogPost(
        title="Kriptoqrafiya: Tarixi, Prinsipləri və Şifrələmə Texnologiyaları",
        author="Admin",
        content="""
<h2>1. Kriptoqrafiyanın Mahiyyəti</h2>
<p>Kriptoqrafiya, məlumatların mənasını başqalarının anlamaması üçün qoruma sənətidir. Bu proses sehrli deyil; riyazi düsturlar, açarlar və simvollar vasitəsilə həyata keçirilir. Minilliklərdir insanlar gizli mesajlar göndərmək üçün fərqli üsullardan istifadə ediblər.</p>

<p>Bugünkü gündəlik həyatımızda kriptoqrafiya demək olar ki, görünməzdir. Mesaj göndərərkən, onlayn alış-veriş edərkən və ya bank hesabına daxil olarkən məlumatlarınız cihazdan serverə və əksinə təhlükəsiz şəkildə ötürülür.</p>

<p>Məsələn, WhatsApp və Telegram kimi tətbiqlərdə mesajlar yalnız göndərən və alıcı tərəfindən oxuna bilir – serverlər belə onları açıq formada saxlamır.</p>

<h2>2. Kriptoqrafiyanın Tarixi</h2>
<ul>
<li><strong>Yunanlar:</strong> Scytale aləti ilə perqamentə bükülmüş taxta silindr üzərində mesajları şifrələyirdilər.</li>
<li><strong>Sezar Şifrəsi:</strong> Yuli Sezar hərfləri əlifbada müəyyən sayda dəyişdirərək mesaj göndərirdi.</li>
<li><strong>Enigma Maşını:</strong> 20-ci əsrdə Almaniyanın istifadə etdiyi şifrələmə cihazı. Alan Turinq və komandası onun şifrəsini açaraq İkinci Dünya Müharibəsinin gedişatına böyük təsir göstərdi.</li>
</ul>

<h2>3. Müasir Kriptoqrafiyanın Prinsipləri</h2>
<ul>
<li><strong>Məxfilik:</strong> Məlumat yalnız nəzərdə tutulan şəxs üçün əlçatandır.</li>
<li><strong>Bütünlük:</strong> Məlumat ötürülmə zamanı dəyişdirilə bilməz.</li>
<li><strong>İdentifikasiya:</strong> Göndəricinin kimliyi təsdiqlənir.</li>
<li><strong>Təxirəsalınmazlıq:</strong> Göndərici mesaj göndərmədiyini iddia edə bilməz.</li>
</ul>
"""
    ),

        BlogPost(
    title="Şifrələmə: Növləri, İş Prinsipi və Real Həyat Tətbiqləri",
    author="Admin",
    content="""
<h2>Şifrələmə nədir?</h2>
<p>Şifrələmə oxuna bilən məlumatı (plain text) oxunmaz formata (cipher text) çevirən prosesdir. Yalnız düzgün açara sahib olan şəxs məlumatı geri qaytararaq mənalandıra bilər. Bu proses məlumatların məxfi qalmasını və üçüncü tərəflərin müdaxiləsinin qarşısını alır.</p>

<h2>Şifrələmənin Növləri</h2>
<ul>
<li><strong>Simmetrik Şifrələmə:</strong> Eyni açar məlumatı həm şifrələmək, həm də açmaq üçün istifadə olunur. Bu üsul sürətlidir və böyük həcmli məlumatların qorunması üçün uyğundur.
    <ul>
        <li>Əsas alqoritmlər: AES, 3DES</li>
        <li>Real Həyat Nümunəsi: Online bank əməliyyatları və internet bankçılıq</li>
    </ul>
</li>
<li><strong>Asimmetrik Şifrələmə (Açıq və Özəl Açar):</strong> Hər istifadəçinin iki açarı var: açıq açar və şəxsi açar. Göndərilən məlumat yalnız şəxsi açarla oxuna bilər. Bu üsul daha etibarlıdır, amma simmetrik şifrələməyə görə daha çox hesablama tələb edir.
    <ul>
        <li>Real Həyat Nümunəsi: HTTPS üzərindən vebsaytlarla təhlükəsiz məlumat ötürülməsi</li>
    </ul>
</li>
<li><strong>Hash Funksiyaları:</strong> Məlumatın unikal rəqəmsal “barmaq izi”ni yaradır. Kiçik dəyişiklik belə hash-ı tamamilə dəyişdirir və geri çevrilməsi mümkün deyil.
    <ul>
        <li>Real Həyat Nümunəsi: Parol qorunması və blokçeyn əməliyyatlarının doğrulanması</li>
    </ul>
</li>
</ul>

<h2>Şifrələmənin İş Prinsipi</h2>
<ol>
<li>Simmetrik üsul: Eyni açar məlumatı şifrələmək və açmaq üçün istifadə olunur.</li>
<li>Asimmetrik üsul: Bir açar məlumatı şifrələyir, digəri isə məlumatı açmaq üçün istifadə olunur.</li>
</ol>

<h2>Real Həyat Tətbiqləri</h2>
<ul>
<li><strong>Cloud xidmətlər:</strong> Google Drive, Dropbox və OneDrive faylları serverdə şifrələyir. Uçdan-uca şifrələmə istifadə edən xidmətlərdə hətta provayder də faylları oxuya bilmir.</li>
<li><strong>Təhlükəsiz əlaqə:</strong> SSL/TLS protokolları məlumatların üçüncü tərəflərdən qorunmasını təmin edir.</li>
<li><strong>Bank və ödəniş sistemləri:</strong> Apple Pay, Google Pay və digər sistemlər kriptoqrafiya prinsipləri ilə işləyir.</li>
<li><strong>İki faktorlu autentifikasiya (2FA):</strong> Hər bir birdəfəlik kod kriptoqrafik olaraq yaradılır və qısa müddət etibarlıdır.</li>
</ul>

<p>Şifrələmə, rəqəmsal dünyada məlumatların məxfiliyini, bütövlüyünü və etibarlılığını təmin edən əsas texnologiyadır. O, hər gün mesajlarımızı, sənədlərimizi və əməliyyatlarımızı qoruyur.</p>
"""
),
        BlogPost(
    title="Kriptoqrafiyanın Real Həyat Tətbiqləri",
    author="Admin",
    content="""
<p>Kriptoqrafiya yalnız “şifrələr” və “təhlükəsizlik” deyil – bu, gündəlik həyatımızda hər gün istifadə etdiyimiz texnologiyaların təməlini təşkil edən elmdir. Onun köməyi ilə məlumatlarımız qorunur və rəqəmsal dünyada etibar təmin edilir.</p>

<h2>1. Təhlükəsiz Əlaqə: HTTPS, SSL və TLS</h2>
<p>Brauzerdə ünvan çubuğunda “https://” və kiçik kilid işarəsi gördüyünüz zaman, bu, sadəcə vizual detal deyil. Pərdə arxasında SSL/TLS protokolları məlumatların şifrələnməsini təmin edir və üçüncü şəxslərin onları oxumasının qarşısını alır. Parollar, şəxsi mesajlar və bank məlumatları – bütün bunlar şifrələnmiş tunel vasitəsilə ötürülür.</p>

<h2>2. Rəqəmsal İmzalar və Sertifikatlar</h2>
<p>Rəqəmsal imzalar mesajın və ya sənədin həqiqi göndəricidən gəldiyini təsdiqləyir və məlumatın ötürülmə zamanı dəyişdirilmədiyini göstərir. SSL sertifikatları istifadəçilərə vebsaytın orijinal olduğunu zəmanət verir.</p>

<h2>3. Kriptovalyutalar və Blokçeyn</h2>
<p>Kriptoqrafiya olmadan kriptovalyutalar mövcud ola bilməzdi. Blokçeyn texnologiyası məlumatları dəyişdirilməz şəkildə saxlayır, hər bir əməliyyat blok şəklində əlavə olunur və kriptoqrafik alqoritmlərlə qorunur. Açıq və şəxsi açarlar əməliyyatları imzalamaq üçün, hash funksiyaları isə blokların dəyişməzliyini təmin etmək üçün istifadə olunur.</p>

<h2>4. Cloud Yaddaş</h2>
<p>Google Drive, Dropbox, OneDrive və digər bulud xidmətləri faylları server və ya müştəri tərəfində şifrələyir. Uçdan-uca şifrələmə istifadə edən platformalarda hətta xidmət provayderi də fayllara baxa bilmir.</p>

<h2>5. Təhlükəsiz İdentifikasiya və 2FA</h2>
<p>Parolların özü də kriptoqrafik qorunma nümunəsidir – sistem parolu birbaşa saxlamır, onun hashını yoxlayır. İki faktorlu autentifikasiya (2FA) əlavə qoruma qatını təmin edir.</p>

<h2>6. Bank və Ödəniş Sistemləri</h2>
<p>Bank əməliyyatları və onlayn ödənişlər bir neçə kriptoqrafik təbəqə ilə qorunur: məlumatların şifrələnməsi, əməliyyatların rəqəmsal imzalar vasitəsilə təsdiqlənməsi, kart məlumatlarının tokenizasiya ilə qorunması. Apple Pay və Google Pay kimi sistemlər də bu prinsiplərə əsaslanır.</p>

<h2>7. Gündəlik Həyatda Kriptoqrafiya</h2>
<ul>
<li><strong>Bankçılıq:</strong> kart əməliyyatları, internet və mobil ödənişlər şifrələnir.</li>
<li><strong>Mesajlaşma:</strong> WhatsApp, Signal, Telegram kimi tətbiqlərdə “end-to-end encryption” ilə mesajlar yalnız göndərici və alıcı tərəfindən oxuna bilir.</li>
<li><strong>Elektron sənədlər:</strong> Rəqəmsal imza və şifrələmə alqoritmləri sənədlərin dəyişdirilmədən göndərilməsini təmin edir.</li>
</ul>

<p>Kriptoqrafiya görünməz bir qalxan kimi fəaliyyət göstərir, məlumatlarımızı qoruyur və rəqəmsal dünyada etibarın yaranmasını təmin edir. Onun köməyi olmadan heç bir onlayn xidmət tam təhlükəsiz olmazdı.</p>
"""
),
       BlogPost(
    title="🔐 Kriptoqrafiyada Son Yeniliklər və Araşdırmalar (2024‑2025)",
    author="Admin",
    content="""
<p>✨ <strong>Giriş:</strong></p>
<p>Kriptoqrafiya, məlumatların məxfiliyini, bütövlüyünü və doğruluğunu qoruyan əsas texnologiyadır. Son illərdə kvant kompüterlərinin inkişafı səbəbindən klassik kripto metodlarının təhlükəsizliyi sual altına düşüb ⚠️. Bu səbəbdən post‑kvant kriptoqrafiya (PQC) və hibrid kripto modelləri akademik, kommersiya və dövlət səviyyəsində əsas diqqət mərkəzindədir.</p>

<h2>Post-Kvant Kriptoqrafiya (PQC) və Standartlar</h2>
<p>2024-cü ilin avqustunda NIST PQC üçün ilk rəsmi standartlarını qəbul etdi:</p>
<ul>
<li>🟢 <strong>ML-KEM (CRYSTALS-Kyber)</strong> – açar mübadiləsi / şifrələmə</li>
<li>🟢 <strong>ML-DSA (CRYSTALS-Dilithium)</strong> – rəqəmsal imzalar</li>
<li>🟢 <strong>SLH-DSA (SPHINCS+)</strong> – alternativ imza sxemi</li>
</ul>

<p>2025-ci ilin martında <strong>HQC kod‑əsaslı açar mübadiləsi</strong> standartlaşdırıldı.</p>

<h2>🔗 Hibrid Modellər</h2>
<p>Klassik kripto + PQC + Kvant Açar Paylanması (QKD) real sistemlərdə kvant təhlükəsinə qarşı effektiv strategiya kimi tətbiq olunur.</p>

<p>💡 <strong>Qeyd:</strong> PQC standartları artıq yalnız nəzəri sahə deyil, həm də kommersiya və dövlət səviyyəsində tətbiq olunur.</p>
"""
)
    ]

    db.session.add_all(posts)
    db.session.commit()
    print("✅ 4 blog yazısı instance/database.db faylına əlavə olundu!")
