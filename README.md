# Si Peka - Sistem Pelaporan Masyarakat

🌍 **[Bahasa Indonesia](#bahasa-indonesia)** | 🇬🇧 **[English](#english)** | 🇯🇵 **[日本語 (Japanese)](#日本語)**

---

<a id="bahasa-indonesia"></a>
## 🇮🇩 Bahasa Indonesia

**Si Peka (Sistem Pelaporan Masyarakat)** adalah aplikasi web *full-stack* interaktif yang dirancang untuk memudahkan warga dalam melaporkan keluhan, masalah infrastruktur, lingkungan, maupun keamanan kepada instansi terkait secara transparan dan efisien.

### ✨ Fitur Utama
* **Dashboard Warga**: Warga dapat membuat laporan baru, mengunggah foto bukti, dan memantau perkembangan laporannya secara *real-time*.
* **Dashboard Admin**: Panel interaktif bagi admin instansi untuk meninjau, mengubah status laporan, dan memberikan balasan/tanggapan langsung ke warga.
* **Filter & Pencarian**: Admin dapat menyaring ribuan laporan berdasarkan kategori (Infrastruktur, Keamanan, Lingkungan, dll) dan status.
* **Mode Tema Adaptif (Dark/Light Mode)**: Antarmuka yang mulus dan nyaman di mata dengan fitur penyimpanan tema.
* **Deployment Ready**: Terintegrasi penuh dengan Docker (`docker-compose`) serta menggunakan arsitektur penyimpanan file hibrida (Penyimpanan Lokal / Azure Blob Storage).

### 📁 Struktur Folder
```text
SiPeka/
├── backend/            # Backend server (Node.js & Express)
│   ├── prisma/         # Skema database & migrasi Prisma ORM
│   ├── src/            # Kode sumber backend (controllers, routes, dll)
│   └── Dockerfile      # Konfigurasi Docker untuk backend
├── frontend/           # Frontend web (React, Vite, Tailwind CSS)
│   ├── public/         # Aset publik statis
│   ├── src/            # Kode sumber frontend (components, pages, dll)
│   ├── nginx.conf      # Konfigurasi Nginx
│   └── Dockerfile      # Konfigurasi Docker untuk frontend
└── docker-compose.yml  # Orkestrasi Docker
```

### 🚀 Teknologi yang Digunakan
* **Frontend**: React (Vite), Tailwind CSS v3, React Router DOM, Lucide Icons.
* **Backend**: Node.js (Express), JavaScript ES Modules, Multer (Upload File), JWT (Authentication).
* **Database & ORM**: PostgreSQL dengan Prisma ORM v5.
* **Infrastruktur**: Docker, Docker Compose, Nginx.

### 🛠️ Cara Menjalankan secara Lokal
1. Pastikan **Docker** dan **Docker Compose** telah terpasang.
2. Clone repositori ini.
3. Jalankan perintah berikut di terminal:
   ```bash
   docker-compose up --build
   ```
4. Akses frontend di `http://localhost:80` dan API backend di `http://localhost:5000`.
   *(Catatan: Akun admin bawaan telah dibuat otomatis di database)*

---

<a id="english"></a>
## 🇬🇧 English

**Si Peka (Public Reporting System)** is an interactive full-stack web application designed to facilitate citizens in reporting complaints, infrastructure issues, environmental concerns, or security matters to the relevant authorities transparently and efficiently.

### ✨ Key Features
* **Citizen Dashboard**: Citizens can create new reports, upload photo evidence, and track the progress of their reports in real-time.
* **Admin Dashboard**: An interactive panel for agency admins to review, update report statuses, and provide direct replies/feedback to citizens.
* **Filtering & Searching**: Admins can filter thousands of reports based on categories (Infrastructure, Security, Environment, etc.) and statuses.
* **Adaptive Theme Mode (Dark/Light Mode)**: A smooth, eye-friendly interface with saved theme preferences.
* **Deployment Ready**: Fully integrated with Docker (`docker-compose`) and features a hybrid file storage architecture (Local Storage / Azure Blob Storage).

### 📁 Folder Structure
```text
SiPeka/
├── backend/            # Node.js & Express backend server
│   ├── prisma/         # Prisma ORM database schema & migrations
│   ├── src/            # Backend source code (controllers, routes, etc.)
│   └── Dockerfile      # Backend Docker configuration
├── frontend/           # React frontend (Vite, Tailwind CSS)
│   ├── public/         # Static public assets
│   ├── src/            # Frontend source code (components, pages, etc.)
│   ├── nginx.conf      # Nginx configuration
│   └── Dockerfile      # Frontend Docker configuration
└── docker-compose.yml  # Docker orchestration
```

### 🚀 Technologies Used
* **Frontend**: React (Vite), Tailwind CSS v3, React Router DOM, Lucide Icons.
* **Backend**: Node.js (Express), JavaScript ES Modules, Multer (File Upload), JWT (Authentication).
* **Database & ORM**: PostgreSQL with Prisma ORM v5.
* **Infrastructure**: Docker, Docker Compose, Nginx.

### 🛠️ How to Run Locally
1. Ensure **Docker** and **Docker Compose** are installed.
2. Clone this repository.
3. Run the following command in your terminal:
   ```bash
   docker-compose up --build
   ```
4. Access the frontend at `http://localhost:80` and the backend API at `http://localhost:5000`.
   *(Note: A default admin account is automatically seeded into the database)*

---

<a id="日本語"></a>
## 🇯🇵 日本語 (Japanese)

**Si Peka (公的通報システム)** は、市民がインフラの問題、環境への懸念、治安などの苦情を関係機関に透明かつ効率的に報告できるように設計された、インタラクティブなフルスタックWebアプリケーションです。

### ✨ 主な機能
* **市民ダッシュボード (Citizen Dashboard)**: 市民は新しい報告を作成し、証拠写真をアップロードし、報告の進捗状況をリアルタイムで追跡できます。
* **管理者ダッシュボード (Admin Dashboard)**: 機関の管理者が報告を確認し、ステータスを更新し、市民に直接返信やフィードバックを提供するためのインタラクティブなパネルです。
* **フィルタリングと検索**: 管理者は、カテゴリ（インフラ、セキュリティ、環境など）やステータスに基づいて、何千もの報告をフィルタリングできます。
* **適応型テーマモード (ダーク/ライトモード)**: テーマ設定を保存できる、スムーズで目に優しいインターフェース。
* **デプロイ準備完了**: Docker (`docker-compose`) と完全に統合されており、ハイブリッドファイルストレージアーキテクチャ（ローカルストレージ / Azure Blob Storage）を備えています。

### 📁 フォルダ構成
```text
SiPeka/
├── backend/            # Node.js & Express バックエンドサーバー
│   ├── prisma/         # Prisma ORM データベーススキーマとマイグレーション
│   ├── src/            # バックエンドのソースコード（コントローラー、ルートなど）
│   └── Dockerfile      # バックエンドのDocker設定
├── frontend/           # React フロントエンド（Vite, Tailwind CSS）
│   ├── public/         # 静的パブリックアセット
│   ├── src/            # フロントエンドのソースコード（コンポーネント、ページなど）
│   ├── nginx.conf      # Nginx の設定
│   └── Dockerfile      # フロントエンドのDocker設定
└── docker-compose.yml  # Dockerオーケストレーション
```

### 🚀 使用技術
* **フロントエンド**: React (Vite), Tailwind CSS v3, React Router DOM, Lucide Icons.
* **バックエンド**: Node.js (Express), JavaScript ES Modules, Multer (ファイルアップロード), JWT (認証).
* **データベースとORM**: PostgreSQL, Prisma ORM v5.
* **インフラ**: Docker, Docker Compose, Nginx.

### 🛠️ ローカルでの実行方法
1. **Docker** と **Docker Compose** がインストールされていることを確認します。
2. このリポジトリをクローン（複製）します。
3. ターミナルで次のコマンドを実行します：
   ```bash
   docker-compose up --build
   ```
4. フロントエンドは `http://localhost:80` に、バックエンドAPIは `http://localhost:5000` にアクセスしてください。
   *(注: デフォルトの管理者アカウントは自動的にデータベースに登録されます)*
