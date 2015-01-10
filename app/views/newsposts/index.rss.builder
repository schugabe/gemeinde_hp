author = "Evangelische Kirche Thening"

xml.instruct! :xml, :version => "1.0" 
xml.rss :version => "2.0" do
  xml.channel do
    xml.title "News"
    xml.description "Neuigkeiten von der Evangelischen Kirche Thening"
    xml.link newsposts_url

    for newspost in @newsposts
      xml.item do
        xml.title newspost.title
        xml.description newspost.body
        xml.pubDate newspost.created_at.to_s(:rfc822)
        xml.link newspost_url(newspost)
        xml.guid newspost_url(newspost)
      end
    end
  end
end