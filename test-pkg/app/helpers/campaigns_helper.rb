# coding: utf-8

module CampaignsHelper

  def defaultCss(face)
    if face.face.upcase == "PC" 
      "/css/pc/themes/default/style.css"
    else
      "/css/sp/themes/default/style.css"
    end
  end

  def defaultTitle(face)
    ""
  end

  def defaultDescription(face)
    if face.face.upcase == "PC" 
      '<p>動画を見ながらアンケートに答えてプレゼントをもらおう！</p><p>#{point}ポイントプレゼント</p>'
    else
      '<p>動画を見ながらアンケートに答えて#{point}ポイントもらおう</p>'
    end
  end

  def defaultMessage
    '<p>アンケートは終了です。ありがとうございました。</p>'
  end

end
