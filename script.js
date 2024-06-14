// CSVデータを解析する関数
const csvParse = (fileContent) => {
  return new Promise((resolve) => {
    // Papaparseを使用してCSVファイルを解析する
    Papa.parse(fileContent, {
      header: true, // CSVファイルの最初の行をヘッダーとして扱う
      skipEmptyLines: true, // 空行をスキップする
      complete: function (results) {
        resolve(results.data); // 解析が完了したらデータをresolveする
      },
    });
  });
};

// ファイル選択フィールドにchangeイベントリスナーを追加する
document.getElementById("csvFile").addEventListener("change", (event) => {
  const file = event.target.files[0]; // 選択されたファイルを取得
  if (file) {
    const reader = new FileReader(); // FileReaderオブジェクトを作成

    // ファイルの読み込みが完了したときの処理
    reader.onload = (e) => {
      const fileContent = e.target.result; // ファイルの内容を取得
      csvParse(fileContent).then((data) => {
        const csvDataTextarea = document.getElementById("csvData");
        // CSVデータをJSON形式の文字列に変換し、テキストエリアに表示
        csvDataTextarea.value = JSON.stringify(data, null, 2);
      });
    };

    // ファイルをテキストとして読み込む
    reader.readAsText(file);
  }
});
