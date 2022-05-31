using Azure.Storage.Blobs;

namespace FightNight.Services.BlobService{
    public interface IBlobService{
        BlobContainerClient GetContainerClient(string blobContainerName);
        Task<Uri> UploadFileBlobAsync(string blobContainerName, Stream content, string contentType, string fileName);
    }
}
