# coding: utf-8
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# 養命酒
enq = Enq.create(status: 1)

campaign = Campaign.create(mid: '2CA81036-BC7A-46FE-8D15-ED670C1B00E7', enq_id: enq.uuid, status: 1, platform: 'mixi', point: 13, movie: '/images/media/yomeishu.mp4', thumbnail: '/images/poster-sp.jpg',
                           conversion_tag: '<img src="../../images/conversion.jpg" alt="サンプル">', second_picture: '/images/creative-sp.jpg', client_url: 'http://www.yomeishu.co.jp/megumi/kaorisu')

enq_face_sp = EnqFace.create(enq_id: enq.uuid, face: 'SP', wait_until: 30)
enq_face_pc = EnqFace.create(enq_id: enq.uuid, face: 'PC', wait_until: 30)

q1 = Question.create(kind: 'radio', title: '性別をお答えください。', required: true)
q2 = Question.create(kind: 'radio', title: '年齢をお答えください。', required: true)
q3 = Question.create(kind: 'radio', title: 'このCMをご覧になって「ハーブの恵み」の香りに興味を持たれましたか？', required: true)
q4 = Question.create(kind: 'radio', title: 'このCMをご覧になって「ハーブの恵み」を飲んでみたいと思いましたか？', required: true)
q5 = Question.create(kind: 'radio', title: 'このCMをご覧になって「ハーブの恵み」を買ってみたいと思いましたか？', required: true)
q6 = Question.create(kind: 'radio', title: '「ハーブの恵み スパークリング」を以前からご存知でしたか？', required: true)
q7 = Question.create(kind: 'radio', title: '「ハーブの恵み スパークリング」を飲んだことがありますか？', required: true)
q8 = Question.create(kind: 'radio', title: '「ハーブの恵み」を以前からご存知でしたか？', required: true)
q9 = Question.create(kind: 'radio', title: '「ハーブの恵み」を飲んだことがありますか？', required: true)
q10 = Question.create(kind: 'radio', title: '最後に今回の動画を再生したきっかけを教えてください。', required: true)

q1_c1 = Choice.create(question_id: q1.uuid, order: 1, content: '男性')
q1_c2 = Choice.create(question_id: q1.uuid, order: 2, content: '女性')

q2_c1 = Choice.create(question_id: q2.uuid, order: 1, content: '20~29歳')
q2_c2 = Choice.create(question_id: q2.uuid, order: 2, content: '30~39歳')
q2_c3 = Choice.create(question_id: q2.uuid, order: 3, content: '40~49歳')
q2_c4 = Choice.create(question_id: q2.uuid, order: 4, content: '50~59歳')
q2_c5 = Choice.create(question_id: q2.uuid, order: 5, content: '60歳以上')

q3_c1 = Choice.create(question_id: q3.uuid, order: 1, content: '非常に興味を持った')
q3_c2 = Choice.create(question_id: q3.uuid, order: 2, content: 'やや興味を持った')
q3_c3 = Choice.create(question_id: q3.uuid, order: 3, content: 'どちらともいえない')
q3_c4 = Choice.create(question_id: q3.uuid, order: 4, content: 'あまり興味は持たなかった')
q3_c5 = Choice.create(question_id: q3.uuid, order: 5, content: '全く興味は持たなかった')

q4_c1 = Choice.create(question_id: q4.uuid, order: 1, content: '非常に飲んでみたい')
q4_c2 = Choice.create(question_id: q4.uuid, order: 2, content: 'やや飲んでみたい')
q4_c3 = Choice.create(question_id: q4.uuid, order: 3, content: 'どちらともいえない')
q4_c4 = Choice.create(question_id: q4.uuid, order: 4, content: 'あまり飲んでみたくない')
q4_c5 = Choice.create(question_id: q4.uuid, order: 5, content: '全く飲んでみたくない')

q5_c1 = Choice.create(question_id: q5.uuid, order: 1, content: '非常に買ってみたい')
q5_c2 = Choice.create(question_id: q5.uuid, order: 2, content: 'やや買ってみたい')
q5_c3 = Choice.create(question_id: q5.uuid, order: 3, content: 'どちらともいえない')
q5_c4 = Choice.create(question_id: q5.uuid, order: 4, content: 'あまり買ってみたくはない')
q5_c5 = Choice.create(question_id: q5.uuid, order: 5, content: 'まったく買ってみたくはない')

q6_c1 = Choice.create(question_id: q6.uuid, order: 1, content: '以前から知っていた')
q6_c2 = Choice.create(question_id: q6.uuid, order: 2, content: '今回はじめて知った')

q7_c1 = Choice.create(question_id: q7.uuid, order: 1, content: '購入して飲んだことがある')
q7_c2 = Choice.create(question_id: q7.uuid, order: 2, content: '試飲会や試供品で飲んだことがある')
q7_c3 = Choice.create(question_id: q7.uuid, order: 3, content: '飲んだことはない')

q8_c1 = Choice.create(question_id: q8.uuid, order: 1, content: '以前から知っていた')
q8_c2 = Choice.create(question_id: q8.uuid, order: 2, content: '今回はじめて知った')

q9_c1 = Choice.create(question_id: q9.uuid, order: 1, content: '購入して飲んだことがある')
q9_c2 = Choice.create(question_id: q9.uuid, order: 2, content: '試飲会や試供品で飲んだことがある')
q9_c3 = Choice.create(question_id: q9.uuid, order: 3, content: '飲んだことはない')

q10_c1 = Choice.create(question_id: q10.uuid, order: 1, content: '商品が気になったから')
q10_c2 = Choice.create(question_id: q10.uuid, order: 2, content: 'ポイントがついていたから')
q10_c3 = Choice.create(question_id: q10.uuid, order: 3, content: '動画が面白そうだったから')

enq_sp_page10 = EnqPage.create(enq_face_id: enq_face_sp.uuid)
enq_sp_page9 = EnqPage.create(enq_face_id: enq_face_sp.uuid, next_page_id: enq_sp_page10.uuid)
enq_sp_page8 = EnqPage.create(enq_face_id: enq_face_sp.uuid, next_page_id: enq_sp_page9.uuid)
enq_sp_page7 = EnqPage.create(enq_face_id: enq_face_sp.uuid, next_page_id: enq_sp_page8.uuid)
enq_sp_page6 = EnqPage.create(enq_face_id: enq_face_sp.uuid, next_page_id: enq_sp_page7.uuid)
enq_sp_page5 = EnqPage.create(enq_face_id: enq_face_sp.uuid, next_page_id: enq_sp_page6.uuid)
enq_sp_page4 = EnqPage.create(enq_face_id: enq_face_sp.uuid, next_page_id: enq_sp_page5.uuid)
enq_sp_page3 = EnqPage.create(enq_face_id: enq_face_sp.uuid, next_page_id: enq_sp_page4.uuid)
enq_sp_page2 = EnqPage.create(enq_face_id: enq_face_sp.uuid, next_page_id: enq_sp_page3.uuid)
enq_sp_page1 = EnqPage.create(enq_face_id: enq_face_sp.uuid, next_page_id: enq_sp_page2.uuid)
enq_face_sp.first_page_id = enq_sp_page1.uuid
enq_face_sp.save

enq_pc_page10 = EnqPage.create(enq_face_id: enq_face_pc.uuid)
enq_pc_page9 = EnqPage.create(enq_face_id: enq_face_pc.uuid, next_page_id: enq_pc_page10.uuid)
enq_pc_page8 = EnqPage.create(enq_face_id: enq_face_pc.uuid, next_page_id: enq_pc_page9.uuid)
enq_pc_page7 = EnqPage.create(enq_face_id: enq_face_pc.uuid, next_page_id: enq_pc_page8.uuid)
enq_pc_page6 = EnqPage.create(enq_face_id: enq_face_pc.uuid, next_page_id: enq_pc_page7.uuid)
enq_pc_page5 = EnqPage.create(enq_face_id: enq_face_pc.uuid, next_page_id: enq_pc_page6.uuid)
enq_pc_page4 = EnqPage.create(enq_face_id: enq_face_pc.uuid, next_page_id: enq_pc_page5.uuid)
enq_pc_page3 = EnqPage.create(enq_face_id: enq_face_pc.uuid, next_page_id: enq_pc_page4.uuid)
enq_pc_page2 = EnqPage.create(enq_face_id: enq_face_pc.uuid, next_page_id: enq_pc_page3.uuid)
enq_pc_page1 = EnqPage.create(enq_face_id: enq_face_pc.uuid, next_page_id: enq_pc_page2.uuid)
enq_face_pc.first_page_id = enq_pc_page1.uuid
enq_face_pc.save

enq_sp_q1 = EnqQuestion.create(enq_page_id: enq_sp_page1.uuid, num: 1, seq: 'Q1', question_id: q1.uuid)
enq_sp_q2 = EnqQuestion.create(enq_page_id: enq_sp_page2.uuid, num: 2, seq: 'Q2', question_id: q2.uuid)
enq_sp_q3 = EnqQuestion.create(enq_page_id: enq_sp_page3.uuid, num: 3, seq: 'Q3', question_id: q3.uuid)
enq_sp_q4 = EnqQuestion.create(enq_page_id: enq_sp_page4.uuid, num: 4, seq: 'Q4', question_id: q4.uuid)
enq_sp_q5 = EnqQuestion.create(enq_page_id: enq_sp_page5.uuid, num: 5, seq: 'Q5', question_id: q5.uuid)
enq_sp_q6 = EnqQuestion.create(enq_page_id: enq_sp_page6.uuid, num: 6, seq: 'Q6', question_id: q6.uuid)
enq_sp_q7 = EnqQuestion.create(enq_page_id: enq_sp_page7.uuid, num: 7, seq: 'Q7', question_id: q7.uuid)
enq_sp_q8 = EnqQuestion.create(enq_page_id: enq_sp_page8.uuid, num: 8, seq: 'Q8', question_id: q8.uuid)
enq_sp_q9 = EnqQuestion.create(enq_page_id: enq_sp_page9.uuid, num: 9, seq: 'Q9', question_id: q9.uuid)
enq_sp_q10 = EnqQuestion.create(enq_page_id: enq_sp_page10.uuid, num: 10, seq: 'Q10', question_id: q10.uuid)

enq_pc_q1 = EnqQuestion.create(enq_page_id: enq_pc_page1.uuid, num: 1, seq: 'Q1', question_id: q1.uuid)
enq_pc_q2 = EnqQuestion.create(enq_page_id: enq_pc_page2.uuid, num: 2, seq: 'Q2', question_id: q2.uuid)
enq_pc_q3 = EnqQuestion.create(enq_page_id: enq_pc_page3.uuid, num: 3, seq: 'Q3', question_id: q3.uuid)
enq_pc_q4 = EnqQuestion.create(enq_page_id: enq_pc_page4.uuid, num: 4, seq: 'Q4', question_id: q4.uuid)
enq_pc_q5 = EnqQuestion.create(enq_page_id: enq_pc_page5.uuid, num: 5, seq: 'Q5', question_id: q5.uuid)
enq_pc_q6 = EnqQuestion.create(enq_page_id: enq_pc_page6.uuid, num: 6, seq: 'Q6', question_id: q6.uuid)
enq_pc_q7 = EnqQuestion.create(enq_page_id: enq_pc_page7.uuid, num: 7, seq: 'Q7', question_id: q7.uuid)
enq_pc_q8 = EnqQuestion.create(enq_page_id: enq_pc_page8.uuid, num: 8, seq: 'Q8', question_id: q8.uuid)
enq_pc_q9 = EnqQuestion.create(enq_page_id: enq_pc_page9.uuid, num: 9, seq: 'Q9', question_id: q9.uuid)
enq_pc_q10 = EnqQuestion.create(enq_page_id: enq_pc_page10.uuid, num: 10, seq: 'Q10', question_id: q10.uuid)

# PlusOne
enq = Enq.create(status: 1)

campaign = Campaign.create(mid: '28080715-38D2-432A-8B7A-C08454E4BE0B', enq_id: enq.uuid, status: 1, platform: 'mixi', point: 10, movie: 'http://demo.sunbi.co.jp/nci-201205/trunk/streaming/media/plus1/plus1.mp4',
                           thumbnail: '/images/poster-sp.jpg', conversion_tag: '<img src="../../images/conversion.jpg" alt="サンプル">', second_picture: '/images/creative-sp.jpg', client_url: 'http://www.p1-intl.com/')

enq_face_sp = EnqFace.create(enq_id: enq.uuid, face: 'SP', css: '/css/sp/themes/plus1/style.css')
enq_face_pc = EnqFace.create(enq_id: enq.uuid, face: 'PC', css: '/css/pc/themes/plus1/style.css')

q1 = Question.create(kind: 'radio', title: '性別を教えてください。', required: true)
q2 = Question.create(kind: 'radio', title: '年齢を教えてください。', required: true)
q3 = Question.create(kind: 'radio', title: 'もしオリジナルTシャツを作成するとしたらどのような場面ですか？', required: true)
q4 = Question.create(kind: 'radio', title: 'オリジナルTシャツの制作で重視するところはどこですか？', required: true)
q5 = Question.create(kind: 'radio', title: '『プラスワン』の動画を見て良いと思ったところはどこですか？', required: true)
q6 = Question.create(kind: 'radio', title: '【クイズ】動画の中で『プラスワン』の顧客満足度は何％でしたか？', required: true, answer_content: '92%')
q7 = Question.create(kind: 'radio', title: '『プラスワン』というサービスを知っていましたか？', required: true)
q8 = Question.create(kind: 'radio', title: '動画を見てサービスに興味を持ちましたか？', required: true)
q9 = Question.create(kind: 'radio', title: '動画を見てサービスを利用したいと思いましたか？', required: true)
q10 = Question.create(kind: 'radio', title: '今回なぜ動画を見ていただけましたか？', required: true)

q1_c1 = Choice.create(question_id: q1.uuid, order: 1, content: '男性')
q1_c2 = Choice.create(question_id: q1.uuid, order: 2, content: '女性')

q2_c1 = Choice.create(question_id: q2.uuid, order: 1, content: '19歳以下')
q2_c2 = Choice.create(question_id: q2.uuid, order: 2, content: '20~29歳')
q2_c3 = Choice.create(question_id: q2.uuid, order: 3, content: '30~39歳')
q2_c4 = Choice.create(question_id: q2.uuid, order: 4, content: '40~49歳')
q2_c5 = Choice.create(question_id: q2.uuid, order: 5, content: '50歳以上')

q3_c1 = Choice.create(question_id: q3.uuid, order: 1, content: 'サークル等の仲間内で利用')
q3_c2 = Choice.create(question_id: q3.uuid, order: 2, content: 'スポーツチームで利用')
q3_c3 = Choice.create(question_id: q3.uuid, order: 3, content: '勤務している企業/お店で利用')
q3_c4 = Choice.create(question_id: q3.uuid, order: 4, content: '家族・友達で利用')
q3_c5 = Choice.create(question_id: q3.uuid, order: 5, content: 'プレゼントとして利用')

q4_c1 = Choice.create(question_id: q4.uuid, order: 1, content: 'デザイン')
q4_c2 = Choice.create(question_id: q4.uuid, order: 2, content: '着心地')
q4_c3 = Choice.create(question_id: q4.uuid, order: 3, content: '耐久性')
q4_c4 = Choice.create(question_id: q4.uuid, order: 4, content: '価格')
q4_c5 = Choice.create(question_id: q4.uuid, order: 5, content: '制作スピード')

q5_c1 = Choice.create(question_id: q5.uuid, order: 1, content: 'デザインを自由に選べる')
q5_c2 = Choice.create(question_id: q5.uuid, order: 2, content: 'ウェブから簡単に発注できる')
q5_c3 = Choice.create(question_id: q5.uuid, order: 3, content: '顧客満足度が高い')
q5_c4 = Choice.create(question_id: q5.uuid, order: 4, content: '見積もりが簡単にできる')
q5_c5 = Choice.create(question_id: q5.uuid, order: 5, content: '販売実績が年間150万枚と豊富')

q6_c1 = Choice.create(question_id: q6.uuid, order: 1, content: '92%')
q6_c2 = Choice.create(question_id: q6.uuid, order: 2, content: '83%')
q6_c3 = Choice.create(question_id: q6.uuid, order: 3, content: '71%')
q6_c4 = Choice.create(question_id: q6.uuid, order: 4, content: '64%')
q6_c5 = Choice.create(question_id: q6.uuid, order: 5, content: '50%')

q7_c1 = Choice.create(question_id: q7.uuid, order: 1, content: '知っており、自分で利用したことがある。')
q7_c2 = Choice.create(question_id: q7.uuid, order: 2, content: '知っており、知人が利用していたことがある。')
q7_c3 = Choice.create(question_id: q7.uuid, order: 3, content: '知っていたが、利用したことはない。')
q7_c4 = Choice.create(question_id: q7.uuid, order: 4, content: '知らなかった。')

q8_c1 = Choice.create(question_id: q8.uuid, order: 1, content: '非常に興味を持った')
q8_c2 = Choice.create(question_id: q8.uuid, order: 2, content: '少し興味を持った')
q8_c3 = Choice.create(question_id: q8.uuid, order: 3, content: 'あまり興味を持たなかった')
q8_c4 = Choice.create(question_id: q8.uuid, order: 4, content: '全く興味を持たなかった')

q9_c1 = Choice.create(question_id: q9.uuid, order: 1, content: '是非利用したいと思う')
q9_c2 = Choice.create(question_id: q9.uuid, order: 2, content: '機会があれば利用したいと思う')
q9_c3 = Choice.create(question_id: q9.uuid, order: 3, content: '利用したいと思わない')

q10_c1 = Choice.create(question_id: q10.uuid, order: 1, content: 'サービスが魅力的だったから')
q10_c2 = Choice.create(question_id: q10.uuid, order: 2, content: 'ポイントが魅力的だったから')
q10_c3 = Choice.create(question_id: q10.uuid, order: 3, content: 'どちらも魅力的だったから')

enq_sp_page10 = EnqPage.create(enq_face_id: enq_face_sp.uuid)
enq_sp_page9 = EnqPage.create(enq_face_id: enq_face_sp.uuid, next_page_id: enq_sp_page10.uuid)
enq_sp_page8 = EnqPage.create(enq_face_id: enq_face_sp.uuid, next_page_id: enq_sp_page9.uuid)
enq_sp_page7 = EnqPage.create(enq_face_id: enq_face_sp.uuid, next_page_id: enq_sp_page8.uuid)
enq_sp_page6 = EnqPage.create(enq_face_id: enq_face_sp.uuid, next_page_id: enq_sp_page7.uuid)
enq_sp_page5 = EnqPage.create(enq_face_id: enq_face_sp.uuid, next_page_id: enq_sp_page6.uuid)
enq_sp_page4 = EnqPage.create(enq_face_id: enq_face_sp.uuid, next_page_id: enq_sp_page5.uuid)
enq_sp_page3 = EnqPage.create(enq_face_id: enq_face_sp.uuid, next_page_id: enq_sp_page4.uuid)
enq_sp_page2 = EnqPage.create(enq_face_id: enq_face_sp.uuid, next_page_id: enq_sp_page3.uuid)
enq_sp_page1 = EnqPage.create(enq_face_id: enq_face_sp.uuid, next_page_id: enq_sp_page2.uuid)
enq_face_sp.first_page_id = enq_sp_page1.uuid
enq_face_sp.save

enq_pc_page10 = EnqPage.create(enq_face_id: enq_face_pc.uuid)
enq_pc_page9 = EnqPage.create(enq_face_id: enq_face_pc.uuid, next_page_id: enq_pc_page10.uuid)
enq_pc_page8 = EnqPage.create(enq_face_id: enq_face_pc.uuid, next_page_id: enq_pc_page9.uuid)
enq_pc_page7 = EnqPage.create(enq_face_id: enq_face_pc.uuid, next_page_id: enq_pc_page8.uuid)
enq_pc_page6 = EnqPage.create(enq_face_id: enq_face_pc.uuid, next_page_id: enq_pc_page7.uuid)
enq_pc_page5 = EnqPage.create(enq_face_id: enq_face_pc.uuid, next_page_id: enq_pc_page6.uuid)
enq_pc_page4 = EnqPage.create(enq_face_id: enq_face_pc.uuid, next_page_id: enq_pc_page5.uuid)
enq_pc_page3 = EnqPage.create(enq_face_id: enq_face_pc.uuid, next_page_id: enq_pc_page4.uuid)
enq_pc_page2 = EnqPage.create(enq_face_id: enq_face_pc.uuid, next_page_id: enq_pc_page3.uuid)
enq_pc_page1 = EnqPage.create(enq_face_id: enq_face_pc.uuid, next_page_id: enq_pc_page2.uuid)
enq_face_pc.first_page_id = enq_pc_page1.uuid
enq_face_pc.save

enq_sp_q1 = EnqQuestion.create(enq_page_id: enq_sp_page1.uuid, num: 1, seq: 'Q1', question_id: q1.uuid)
enq_sp_q2 = EnqQuestion.create(enq_page_id: enq_sp_page2.uuid, num: 2, seq: 'Q2', question_id: q2.uuid)
enq_sp_q3 = EnqQuestion.create(enq_page_id: enq_sp_page3.uuid, num: 3, seq: 'Q3', question_id: q3.uuid)
enq_sp_q4 = EnqQuestion.create(enq_page_id: enq_sp_page4.uuid, num: 4, seq: 'Q4', question_id: q4.uuid)
enq_sp_q5 = EnqQuestion.create(enq_page_id: enq_sp_page5.uuid, num: 5, seq: 'Q5', question_id: q5.uuid)
enq_sp_q6 = EnqQuestion.create(enq_page_id: enq_sp_page6.uuid, num: 6, seq: 'Q6', question_id: q6.uuid)
enq_sp_q7 = EnqQuestion.create(enq_page_id: enq_sp_page7.uuid, num: 7, seq: 'Q7', question_id: q7.uuid)
enq_sp_q8 = EnqQuestion.create(enq_page_id: enq_sp_page8.uuid, num: 8, seq: 'Q8', question_id: q8.uuid)
enq_sp_q9 = EnqQuestion.create(enq_page_id: enq_sp_page9.uuid, num: 9, seq: 'Q9', question_id: q9.uuid)
enq_sp_q10 = EnqQuestion.create(enq_page_id: enq_sp_page10.uuid, num: 10, seq: 'Q10', question_id: q10.uuid)

enq_pc_q1 = EnqQuestion.create(enq_page_id: enq_pc_page1.uuid, num: 1, seq: 'Q1', question_id: q1.uuid)
enq_pc_q2 = EnqQuestion.create(enq_page_id: enq_pc_page2.uuid, num: 2, seq: 'Q2', question_id: q2.uuid)
enq_pc_q3 = EnqQuestion.create(enq_page_id: enq_pc_page3.uuid, num: 3, seq: 'Q3', question_id: q3.uuid)
enq_pc_q4 = EnqQuestion.create(enq_page_id: enq_pc_page4.uuid, num: 4, seq: 'Q4', question_id: q4.uuid)
enq_pc_q5 = EnqQuestion.create(enq_page_id: enq_pc_page5.uuid, num: 5, seq: 'Q5', question_id: q5.uuid)
enq_pc_q6 = EnqQuestion.create(enq_page_id: enq_pc_page6.uuid, num: 6, seq: 'Q6', question_id: q6.uuid)
enq_pc_q7 = EnqQuestion.create(enq_page_id: enq_pc_page7.uuid, num: 7, seq: 'Q7', question_id: q7.uuid)
enq_pc_q8 = EnqQuestion.create(enq_page_id: enq_pc_page8.uuid, num: 8, seq: 'Q8', question_id: q8.uuid)
enq_pc_q9 = EnqQuestion.create(enq_page_id: enq_pc_page9.uuid, num: 9, seq: 'Q9', question_id: q9.uuid)
enq_pc_q10 = EnqQuestion.create(enq_page_id: enq_pc_page10.uuid, num: 10, seq: 'Q10', question_id: q10.uuid)

# レッグマジックX
enq = Enq.create(status: 1)

campaign = Campaign.create(mid: '2F8E144A-7AB8-49D9-A49A-02D907A83ACC', enq_id: enq.uuid, status: 1, platform: 'gree', point: 10, movie: 'http://demo.sunbi.co.jp/nci-201205/trunk/streaming/media/lgmx/lgmx.flv',
                           thumbnail: '/images/poster-sp.jpg', conversion_tag: '<img src="../../images/conversion.jpg" alt="サンプル">', second_picture: '/images/creative-sp.jpg', client_url: 'http://www.exabody.jp/smp-lp/lgmx/?af_id=262&s_ma=90WDRM01_md15_m1')

enq_face_sp = EnqFace.create(enq_id: enq.uuid, face: 'SP', css: '/css/sp/themes/lgmx/style.css')
enq_face_pc = EnqFace.create(enq_id: enq.uuid, face: 'PC', css: '/css/pc/themes/lgmx/style.css')

q1 = Question.create(kind: 'radio', title: '性別を教えてください。', required: true)
q2 = Question.create(kind: 'radio', title: '年齢を教えてください。', required: true)
q3 = Question.create(kind: 'radio', title: '最近ウエスト、脚、ヒップのサイズが気になったことはありますか？', required: true)
q4 = Question.create(kind: 'radio', title: 'オリジナルTシャツの制作で重視するところはどこですか？', required: true)
q5 = Question.create(kind: 'radio', title: '『プラスワン』の動画を見て良いと思ったところはどこですか？', required: true)
q6 = Question.create(kind: 'radio', title: '【クイズ】動画の中で『プラスワン』の顧客満足度は何％でしたか？', required: true)

q1_c1 = Choice.create(question_id: q1.uuid, order: 1, content: '男性')
q1_c2 = Choice.create(question_id: q1.uuid, order: 2, content: '女性')

q2_c1 = Choice.create(question_id: q2.uuid, order: 1, content: '19歳以下')
q2_c2 = Choice.create(question_id: q2.uuid, order: 2, content: '20-29歳')
q2_c3 = Choice.create(question_id: q2.uuid, order: 3, content: '30-39歳')
q2_c4 = Choice.create(question_id: q2.uuid, order: 4, content: '40-49歳')
q2_c5 = Choice.create(question_id: q2.uuid, order: 5, content: '50歳以上')

q3_c1 = Choice.create(question_id: q3.uuid, order: 1, content: 'ある')
q3_c2 = Choice.create(question_id: q3.uuid, order: 2, content: 'ない')

q4_c1 = Choice.create(question_id: q4.uuid, order: 1, content: 'はい')
q4_c2 = Choice.create(question_id: q4.uuid, order: 2, content: 'いいえ')

q5_c1 = Choice.create(question_id: q5.uuid, order: 1, content: 'そう思う')
q5_c2 = Choice.create(question_id: q5.uuid, order: 2, content: 'どちらかと言えばそう思う')
q5_c3 = Choice.create(question_id: q5.uuid, order: 3, content: 'どちらとも思わない')
q5_c4 = Choice.create(question_id: q5.uuid, order: 4, content: 'どちらかと言えばそう思わない')
q5_c5 = Choice.create(question_id: q5.uuid, order: 5, content: 'そう思わない')

q6_c1 = Choice.create(question_id: q6.uuid, order: 1, content: 'そう思う')
q6_c2 = Choice.create(question_id: q6.uuid, order: 2, content: 'どちらかと言えばそう思う')
q6_c3 = Choice.create(question_id: q6.uuid, order: 3, content: 'どちらとも思わない')
q6_c4 = Choice.create(question_id: q6.uuid, order: 4, content: 'どちらかと言えばそう思わない')
q6_c5 = Choice.create(question_id: q6.uuid, order: 5, content: 'そう思わない')

enq_sp_page6 = EnqPage.create(enq_face_id: enq_face_sp.uuid)
enq_sp_page5 = EnqPage.create(enq_face_id: enq_face_sp.uuid, next_page_id: enq_sp_page6.uuid)
enq_sp_page4 = EnqPage.create(enq_face_id: enq_face_sp.uuid, next_page_id: enq_sp_page5.uuid)
enq_sp_page3 = EnqPage.create(enq_face_id: enq_face_sp.uuid, next_page_id: enq_sp_page4.uuid)
enq_sp_page2 = EnqPage.create(enq_face_id: enq_face_sp.uuid, next_page_id: enq_sp_page3.uuid)
enq_sp_page1 = EnqPage.create(enq_face_id: enq_face_sp.uuid, next_page_id: enq_sp_page2.uuid)
enq_face_sp.first_page_id = enq_sp_page1.uuid
enq_face_sp.save

enq_pc_page6 = EnqPage.create(enq_face_id: enq_face_pc.uuid)
enq_pc_page5 = EnqPage.create(enq_face_id: enq_face_pc.uuid, next_page_id: enq_pc_page6.uuid)
enq_pc_page4 = EnqPage.create(enq_face_id: enq_face_pc.uuid, next_page_id: enq_pc_page5.uuid)
enq_pc_page3 = EnqPage.create(enq_face_id: enq_face_pc.uuid, next_page_id: enq_pc_page4.uuid)
enq_pc_page2 = EnqPage.create(enq_face_id: enq_face_pc.uuid, next_page_id: enq_pc_page3.uuid)
enq_pc_page1 = EnqPage.create(enq_face_id: enq_face_pc.uuid, next_page_id: enq_pc_page2.uuid)
enq_face_pc.first_page_id = enq_pc_page1.uuid
enq_face_pc.save

enq_sp_q1 = EnqQuestion.create(enq_page_id: enq_sp_page1.uuid, num: 1, seq: 'Q1', question_id: q1.uuid)
enq_sp_q2 = EnqQuestion.create(enq_page_id: enq_sp_page2.uuid, num: 2, seq: 'Q2', question_id: q2.uuid)
enq_sp_q3 = EnqQuestion.create(enq_page_id: enq_sp_page3.uuid, num: 3, seq: 'Q3', question_id: q3.uuid)
enq_sp_q4 = EnqQuestion.create(enq_page_id: enq_sp_page4.uuid, num: 4, seq: 'Q4', question_id: q4.uuid)
enq_sp_q5 = EnqQuestion.create(enq_page_id: enq_sp_page5.uuid, num: 5, seq: 'Q5', question_id: q5.uuid)
enq_sp_q6 = EnqQuestion.create(enq_page_id: enq_sp_page6.uuid, num: 6, seq: 'Q6', question_id: q6.uuid)

enq_pc_q1 = EnqQuestion.create(enq_page_id: enq_pc_page1.uuid, num: 1, seq: 'Q1', question_id: q1.uuid)
enq_pc_q2 = EnqQuestion.create(enq_page_id: enq_pc_page2.uuid, num: 2, seq: 'Q2', question_id: q2.uuid)
enq_pc_q3 = EnqQuestion.create(enq_page_id: enq_pc_page3.uuid, num: 3, seq: 'Q3', question_id: q3.uuid)
enq_pc_q4 = EnqQuestion.create(enq_page_id: enq_pc_page4.uuid, num: 4, seq: 'Q4', question_id: q4.uuid)
enq_pc_q5 = EnqQuestion.create(enq_page_id: enq_pc_page5.uuid, num: 5, seq: 'Q5', question_id: q5.uuid)
enq_pc_q6 = EnqQuestion.create(enq_page_id: enq_pc_page6.uuid, num: 6, seq: 'Q6', question_id: q6.uuid)

# 永谷園
enq = Enq.create(status: 1)

campaign = Campaign.create(mid: 'D75D30FA-0B6F-4800-A8BF-DFDCADD527AF', enq_id: enq.uuid, status: 1, platform: 'gree', point: 10, movie: 'http://demo.sunbi.co.jp/nci-201205/trunk/streaming/media/nagatanien/nagatanien.mp4',
                           thumbnail: '/images/poster-sp.jpg', conversion_tag: '<img src="../../images/conversion.jpg" alt="サンプル">', second_picture: '/images/creative-sp.jpg', client_url: '')

enq_face_sp = EnqFace.create(enq_id: enq.uuid, face: 'SP', css: '/css/sp/themes/nagatanien/style.css')
enq_face_pc = EnqFace.create(enq_id: enq.uuid, face: 'PC', css: '/css/pc/themes/nagatanien/style.css')

q1 = Question.create(kind: 'radio', title: '性別を教えてください。', required: true)
q2 = Question.create(kind: 'radio', title: '年齢を教えてください。', required: true)
q3 = Question.create(kind: 'radio', title: '朝、スッキリと起きられないことがありますか？', required: true)
q4 = Question.create(kind: 'radio', title: 'しじみの中に含まれるオルニチンの健康パワーをご存じでしたか？', required: true)
q5 = Question.create(kind: 'radio', title: '朝スッキリサプリ!!　オルニチンに興味がありますか？', required: true)
q6 = Question.create(kind: 'radio', title: '朝スッキリサプリ！！オルニチン　半額キャンペーン ＋ mixiポイントプレゼントに申し込みたいですか？', required: true)

q1_c1 = Choice.create(question_id: q1.uuid, order: 1, content: '男性')
q1_c2 = Choice.create(question_id: q1.uuid, order: 2, content: '女性')

q2_c1 = Choice.create(question_id: q2.uuid, order: 1, content: '19歳以下')
q2_c2 = Choice.create(question_id: q2.uuid, order: 2, content: '20-29歳')
q2_c3 = Choice.create(question_id: q2.uuid, order: 3, content: '30-39歳')
q2_c4 = Choice.create(question_id: q2.uuid, order: 4, content: '40-49歳')
q2_c5 = Choice.create(question_id: q2.uuid, order: 5, content: '50歳以上')

q3_c1 = Choice.create(question_id: q3.uuid, order: 1, content: 'よくある')
q3_c2 = Choice.create(question_id: q3.uuid, order: 2, content: 'たまにある')
q3_c3 = Choice.create(question_id: q3.uuid, order: 3, content: 'どちらとも言えない')
q3_c4 = Choice.create(question_id: q3.uuid, order: 4, content: 'あまりない')
q3_c5 = Choice.create(question_id: q3.uuid, order: 5, content: '全くない')

q4_c1 = Choice.create(question_id: q4.uuid, order: 1, content: 'よく知っていた')
q4_c2 = Choice.create(question_id: q4.uuid, order: 2, content: 'まあ知っていた')
q4_c2 = Choice.create(question_id: q4.uuid, order: 3, content: '知らなかった')

q5_c1 = Choice.create(question_id: q5.uuid, order: 1, content: '非常に興味がある')
q5_c2 = Choice.create(question_id: q5.uuid, order: 2, content: 'まあ興味がある')
q5_c3 = Choice.create(question_id: q5.uuid, order: 3, content: 'どちらとも思わない')
q5_c4 = Choice.create(question_id: q5.uuid, order: 4, content: 'あまり興味がない')
q5_c5 = Choice.create(question_id: q5.uuid, order: 5, content: '全く興味がない')

q6_c1 = Choice.create(question_id: q6.uuid, order: 1, content: '申し込みたい')
q6_c2 = Choice.create(question_id: q6.uuid, order: 2, content: 'どちらともいえない')
q6_c3 = Choice.create(question_id: q6.uuid, order: 3, content: '申込みたくない')

enq_sp_page6 = EnqPage.create(enq_face_id: enq_face_sp.uuid)
enq_sp_page5 = EnqPage.create(enq_face_id: enq_face_sp.uuid, next_page_id: enq_sp_page6.uuid)
enq_sp_page4 = EnqPage.create(enq_face_id: enq_face_sp.uuid, next_page_id: enq_sp_page5.uuid)
enq_sp_page3 = EnqPage.create(enq_face_id: enq_face_sp.uuid, next_page_id: enq_sp_page4.uuid)
enq_sp_page2 = EnqPage.create(enq_face_id: enq_face_sp.uuid, next_page_id: enq_sp_page3.uuid)
enq_sp_page1 = EnqPage.create(enq_face_id: enq_face_sp.uuid, next_page_id: enq_sp_page2.uuid)
enq_face_sp.first_page_id = enq_sp_page1.uuid
enq_face_sp.save

enq_pc_page6 = EnqPage.create(enq_face_id: enq_face_pc.uuid)
enq_pc_page5 = EnqPage.create(enq_face_id: enq_face_pc.uuid, next_page_id: enq_pc_page6.uuid)
enq_pc_page4 = EnqPage.create(enq_face_id: enq_face_pc.uuid, next_page_id: enq_pc_page5.uuid)
enq_pc_page3 = EnqPage.create(enq_face_id: enq_face_pc.uuid, next_page_id: enq_pc_page4.uuid)
enq_pc_page2 = EnqPage.create(enq_face_id: enq_face_pc.uuid, next_page_id: enq_pc_page3.uuid)
enq_pc_page1 = EnqPage.create(enq_face_id: enq_face_pc.uuid, next_page_id: enq_pc_page2.uuid)
enq_face_pc.first_page_id = enq_pc_page1.uuid
enq_face_pc.save

enq_sp_q1 = EnqQuestion.create(enq_page_id: enq_sp_page1.uuid, num: 1, seq: 'Q1', question_id: q1.uuid)
enq_sp_q2 = EnqQuestion.create(enq_page_id: enq_sp_page2.uuid, num: 2, seq: 'Q2', question_id: q2.uuid)
enq_sp_q3 = EnqQuestion.create(enq_page_id: enq_sp_page3.uuid, num: 3, seq: 'Q3', question_id: q3.uuid)
enq_sp_q4 = EnqQuestion.create(enq_page_id: enq_sp_page4.uuid, num: 4, seq: 'Q4', question_id: q4.uuid)
enq_sp_q5 = EnqQuestion.create(enq_page_id: enq_sp_page5.uuid, num: 5, seq: 'Q5', question_id: q5.uuid)
enq_sp_q6 = EnqQuestion.create(enq_page_id: enq_sp_page6.uuid, num: 6, seq: 'Q6', question_id: q6.uuid)

enq_pc_q1 = EnqQuestion.create(enq_page_id: enq_pc_page1.uuid, num: 1, seq: 'Q1', question_id: q1.uuid)
enq_pc_q2 = EnqQuestion.create(enq_page_id: enq_pc_page2.uuid, num: 2, seq: 'Q2', question_id: q2.uuid)
enq_pc_q3 = EnqQuestion.create(enq_page_id: enq_pc_page3.uuid, num: 3, seq: 'Q3', question_id: q3.uuid)
enq_pc_q4 = EnqQuestion.create(enq_page_id: enq_pc_page4.uuid, num: 4, seq: 'Q4', question_id: q4.uuid)
enq_pc_q5 = EnqQuestion.create(enq_page_id: enq_pc_page5.uuid, num: 5, seq: 'Q5', question_id: q5.uuid)
enq_pc_q6 = EnqQuestion.create(enq_page_id: enq_pc_page6.uuid, num: 6, seq: 'Q6', question_id: q6.uuid)

