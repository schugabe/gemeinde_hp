author = "Evangelische Kirche Thening"

xml.instruct! :xml, :version => "1.0" 
xml.rss "xmlns:itunes" => "http://www.itunes.com/dtds/podcast-1.0.dtd", "xmlns:media" => "http://search.yahoo.com/mrss/", :version => "2.0" do
  xml.channel do
    xml.title "#{author} Podcast"
    xml.description "Predigten und Vorträge von der #{author}"
    xml.link podcast_index_url

    xml.itunes :author, author
    xml.itunes :keywords, "Predigt"
    xml.itunes :explicit, 'clean'
    xml.itunes :image, href: ""
    xml.itunes :owner do
      xml.itunes :name, author
      xml.itunes :email, 'office@evang-thening.at'
    end
    xml.itunes :block, 'no'
    xml.itunes :category, :text => '...' do
      xml.itunes :category, :text => '...'
    end
    
    for podcast in @podcasts
      xml.item do
        xml.title podcast.title
        xml.description podcast.description
        xml.pubDate podcast.created_at.to_s(:rfc822)
        xml.link event_url(podcast.event)
        xml.guid event_url(podcast.event)
        xml.enclosure url: "#{request.protocol}#{request.host_with_port}#{podcast.upload.url}", length: podcast.upload_file_size, type: podcast.upload_content_type
        xml.itunes :author, "Evangelische Gemeinde Thening"
        xml.itunes :subtitle, truncate(podcast.description, length: 150)
        xml.itunes :summary, podcast.description
        xml.itunes :explicit, 'no'
      end
    end
  end
end