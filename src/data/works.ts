export type Work = {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  summary: string;
  tags: string[];
  image?: { src: string; alt: string };
  // 画面を公開できない作品は、画像の代わりに構成図を出す。
  visual?: "architecture";
  // 画面がない作品は、ファイル構成を tree コマンド風に出す。
  tree?: string[];
  sections: { heading: string; items: string[] }[];
  note?: string;
  links?: { label: string; href: string }[];
};

export const works: Work[] = [
  {
    slug: "system-renewal",
    title: "社内業務システムの刷新",
    subtitle: "独自PHPフレームワーク → Laravel 12",
    category: "受託開発（配送事業を営む企業）",
    summary:
      "独自のPHPフレームワークで動いていたコーポレートサイトと社員向けの月報システムを、Laravel 12へ移行しました。移行にあわせてセキュリティ上の問題を洗い出して直し、車両管理や請求書PDFの機能も追加しています。",
    tags: ["PHP 8", "Laravel 12", "Blade", "MariaDB", "PHPUnit"],
    visual: "architecture",
    sections: [
      {
        heading: "移行前の課題",
        items: [
          "入力・確認・完了のページや、担当者別の管理画面がほぼ同じ内容で複製されていた",
          "検索条件や並び替えの列名を文字列連結でSQLに埋め込んでおり、SQLインジェクションが可能だった",
          "パスワードを平文で保存し、変更画面にそのまま表示していた",
          "登録先の社員をフォームの隠し項目で決めていたため、他人の実績を書き換えられた",
        ],
      },
      {
        heading: "行ったこと",
        items: [
          "自前のルーティング・コントローラ・ビューを、Laravelのルーティング・コントローラ・Bladeに置き換え",
          "本番データベースのテーブル定義は変えず、Laravel側を既存の定義に合わせて移行",
          "旧URL 25件に301リダイレクトを設定し、ブックマークや検索エンジンからの流入を維持",
          "月報の入力・確認・登録とPDF出力、社員管理（検索・並び替え・削除・復元）、月次一覧のCSV出力",
          "追加機能として、車両の貸出・整備記録と、月報の実績から作る請求書のPDF一括ダウンロードを実装",
        ],
      },
      {
        heading: "セキュリティの改善",
        items: [
          "クエリビルダと、許可した列名の一覧との照合で、SQLインジェクションを解消",
          "登録対象をログイン中の社員に固定し、他の社員を操作できるのは管理者だけに整理",
          "パスワードをbcryptでハッシュ化。平文でログインに成功した時点でハッシュへ置き換える段階移行と、一括変換コマンドを用意",
          "ソースコードに書かれていたデータベースの接続情報を .env へ移動",
        ],
      },
      {
        heading: "品質の確認",
        items: [
          "PHPUnitによる自動テスト（14件）",
          "本番と同じMariaDB 10.11に本番のテーブル定義を再現した環境で、月次の集計金額が旧システムと一致することを確認",
          "切り替え手順・確認項目・本番作業の記録をドキュメントにまとめて引き継ぎ",
        ],
      },
      {
        heading: "あわせて試したこと",
        items: [
          "移行方法の比較として、React + TypeScriptの画面とPHPのJSON APIに分ける構成も試作しました",
        ],
      },
    ],
    note: "お客様のシステムのため、社名・画面・ソースコードは掲載していません。",
  },
  {
    slug: "ai-buddy",
    title: "AI Buddy",
    subtitle: "会話を覚えるAIチャット",
    category: "個人開発",
    summary:
      "Google Gemini APIを使ったチャットアプリです。返答をリアルタイムに表示し、会話の中から名前や趣味など長く覚えておく価値のある情報をAIが選んで記憶します。",
    tags: ["Next.js 16", "React 19", "Tailwind CSS 4", "Gemini API"],
    image: { src: "/works/ai-buddy.png", alt: "AI Buddyのチャット画面" },
    sections: [
      {
        heading: "主な機能",
        items: [
          "返答をストリーミングで少しずつ表示し、生成の途中で止めることもできる",
          "会話からAIが「覚える価値がある情報」だけを抜き出して記憶し、次の会話で自然に使う",
          "画像を添付して質問できる",
          "Markdownとコードのシンタックスハイライトに対応",
          "複数のチャットの切り替え、履歴の保存、Markdown形式での書き出し",
          "ダークモード",
        ],
      },
      {
        heading: "工夫した点",
        items: [
          "APIキーはサーバー側（Route Handler）だけで扱い、ブラウザには渡さない",
          "IPアドレスごとのレート制限と、文字数（4,000字）・画像（5MBまで、画像形式のみ）の入力チェックで、APIの不正利用と費用を抑える",
          "返答の生成と記憶の抽出を並行して実行し、待ち時間を短縮",
          "画像だけの送信では記憶の抽出を呼ばず、APIの呼び出し回数を減らす",
        ],
      },
    ],
    links: [{ label: "GitHub", href: "https://github.com/siruku27/ai-buddy-web" }],
  },
  {
    slug: "keiba-lab",
    title: "馬券的中率ラボ",
    subtitle: "統計とシミュレーションで買い目を比べるツール",
    category: "個人開発",
    summary:
      "中央競馬の人気別成績データをもとに、どの買い目が当たりやすいかを、グラフとモンテカルロ・シミュレーションで比べられるWebアプリです。",
    tags: ["React 18", "TypeScript", "Vite"],
    image: { src: "/works/keiba-lab.png", alt: "馬券的中率ラボのトップ画面" },
    sections: [
      {
        heading: "主な機能",
        items: [
          "人気別の勝率・連対率・複勝率と、券種ごとの払戻率を、競馬場を選んでグラフで表示",
          "買い目ごとの的中率を比較",
          "同じレース結果で複数の買い方を試し、収支の推移をグラフで比較",
          "1日のレース数・賭け金・目標額から、目標を達成できる割合を最大20,000日分シミュレーション。複数の買い目の組み合わせにも対応",
        ],
      },
      {
        heading: "工夫した点",
        items: [
          "Plackett-Luceモデルで、各馬の強さに応じた着順を確率的に作る",
          "すべての買い目で同じレース結果を共有し、「同じレースを違う買い方で買ったら」を公平に比べる",
          "グラフはライブラリを使わず、SVGで自作（ツールチップ付き）",
          "計算ロジックを画面から切り離し、TypeScriptの型で入出力をはっきりさせた",
          "もとにした統計データの出典を画面に明記",
        ],
      },
    ],
    note: "的中や利益を保証するものではありません。確率の仕組みを理解するための学習用ツールです。",
  },
  {
    slug: "crypto-trader",
    title: "暗号資産 自動売買の検証基盤",
    subtitle: "バックテストからペーパートレードまで",
    category: "個人開発",
    summary:
      "売買ルールを過去のデータで検証し、仮想の資金で自動的に運用（ペーパートレード）するPythonのシステムです。運用の状況はダッシュボードで確認できます。",
    tags: ["Python", "pandas", "NumPy", "ccxt", "MariaDB", "cron"],
    tree: [
      "crypto-trader/",
      "├── main.py            # バックテスト",
      "├── walkforward.py     # ウォークフォワード検証",
      "├── run_paper.py       # ペーパートレード",
      "└── trader/",
      "    ├── strategies.py  # 売買ルール",
      "    ├── paper.py       # 仮想口座と約定",
      "    ├── liquidity.py   # 板の実測",
      "    ├── db.py          # MariaDB",
      "    └── dashboard.py   # ダッシュボード出力",
    ],
    sections: [
      {
        heading: "主な機能",
        items: [
          "取引所のAPIから価格データを取得し、複数の売買ルールをバックテスト",
          "ウォークフォワード検証で、過去のデータに合わせすぎていないかを確認",
          "時間足ごとの口座を持つペーパートレードを、cronで30分ごとに自動実行",
          "取引の記録をMariaDBに保存し、時間足ごとにタブで切り替えられるダッシュボードに出力",
          "取引所の板を実際に測り、注文時の滑り（約定コスト）を記録",
        ],
      },
      {
        heading: "工夫した点",
        items: [
          "保存先を最初のJSONファイルからMariaDBに移し、複数口座の履歴を扱いやすくした",
          "板の測定に失敗しても売買判断は止めないなど、自動実行で止まりにくい作りにした",
          "時刻の表示を日本時間にそろえ、金額には円換算を併記",
        ],
      },
    ],
    note: "実際の資金は使っていない、検証用のシステムです。",
  },
];

export function findWork(slug: string) {
  return works.find((work) => work.slug === slug);
}
