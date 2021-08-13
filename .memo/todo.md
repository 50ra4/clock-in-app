## 環境構築

- [x] ディレクトリ作成
- [x] prettier&eslint 設定
- [ ] jest 設定 （/tests にディレクトリを分けるのが難しく一旦断念）
- [x] styled-component 設定
- [x] storybook 設定
- [x] firebase 設定
- [x] typedoc 設定
- [x] storybook の baseURL の指定ミスったので修正する
- [x] CI 設定
- [x] CD 設定
- [x] Test 修正（タイムゾーン問題）

## 環境構築の追加修正

- [x] storybook の baseURL の指定ミスったので修正する
- [x] readme の修正
- [x] github-pages の root に index.html を置く
- [x] package.json の順番並び替え
- [ ] typedoc の出力対象から tsx を除外（hooks の場合もあるので、一旦なしで）
- [x] style のディレクトリを直下に移動
- [x] theme の型定義を const に変更

## redux 設定

- [x] package install
- [x] middleware 設定
- [x] modules 作成

## service&thunk-action

- [x] service 作成
- [x] thunk-action 作成
- [ ] （上記ではサンプルしか作成していない）他の service と thunk も作成する

## コンポーネント&画面 mock 作成

- [x] ResetCSS の作成
- [ ] 行間スタイルの適用（ref: https://www.asobou.co.jp/blog/web/fontsize#i-2）

### コンポーネント（feedback）

- [x] LoadingSpinner
- [x] Backdrop
  - [x] StopPropagation
- [x] LoadingGuard
- [x] Dialog
  - [x] PopupDialog
  - [x] AlertDialog
  - [x] ConfirmDialog
  - [x] SelectDialog
  - [x] CustomDialog
- [x] SnackBar

### コンポーネント（surfaces）

- [x] Header
- [x] Card
- [x] Paper
- [x] Accordion（低）

### コンポーネント（displays）

- [x] Chip
- [x] Responsive
- [ ] List（該当箇所がないので後回し）
- [x] Divider

### コンポーネント（inputs）

- [x] TextInput
- [x] PasswordInput
- [x] TextArea
- [x] TimeInput
- [x] TimeRangeInput
- [x] DateInput
- [x] Button
- [x] SelectBox
- [ ] ChipCheckbox（低）
- [ ] DatePicker（低）
- [ ] CheckboxGroupInput（低）

### その他残タスク

- [x] NavigationMenu の作成
- [ ] WithLabel に description を移動する
- [ ] memo 化を適切に配置する
- [ ] Style の指定を props から class で行うようにする
- [ ] 処理が速い場合 LoadingGuard がチラつくので background の表示を 1s 遅らせる

### 画面

- [ ] TopPage
- [ ] ErrorPage
- [ ] LoginPage
- [ ] RegistrationPage
- [ ] TimecardPage

### コンポーネント(inputs) refactor

- [ ] TextInputBase
- [x] TextArea
- [x] DateInput
- [x] DateSelect
- [x] TimeInput
- [x] TextTextInput
- [x] SelectInput
- [x] TextInput
- [x] PasswordInput

### コンポーネント（forms）

- [x] LabelForForm
- [x] TextForm
- [x] PasswordForm
- [x] TextAreaForm
- [x] TimeForm
- [x] TimeRangeForm
- [x] DateForm

### その他

- [x] ErrorBoundary

##　スタイル&デザイン

- [ ] TBD

## バリデーション

- [ ] TBD

## Firestore バリデーション

- [ ] TBD
