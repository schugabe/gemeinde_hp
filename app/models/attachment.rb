class Attachment < ActiveRecord::Base
  has_attached_file :upload, :styles => {:large => "1000x1000>", :medium => "300x300>", :thumb => "100x100>" }
  #validates_attachment_content_type :upload, :content_type => /\Aimage\/.*\Z/
  do_not_validate_attachment_file_type :upload
  
  before_post_process :skip_for_audio

  def skip_for_audio
    ! %w(audio/ogg application/ogg audio/mpeg audio/x-mpeg audio/mp3 audio/x-mp3 audio/mpeg3 audio/x-mpeg3 audio/mpg audio/x-mpg audio/x-mpegaudio).include?(upload_content_type)
  end
  
  belongs_to :event
  sanitizes :description
  include Authority::Abilities
end
