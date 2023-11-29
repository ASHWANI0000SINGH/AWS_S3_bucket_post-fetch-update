// POST IN AWS BUCKET********************************************************
const inputFileHandler = (e) => {
  setSelectedFile(e.target.files[0]);

  const file = e.target.files[0];
};
const handleUpload = async () => {
  if (!selectedFile) {
    console.error("No file selected");
    return;
  }

  const albumBucketName = "bucket_name";
  const bucketRegion = "bucket_region";
  const IdentityPoolId = "IdentityPoolId";
  const directoryName = "diretory_name";

  AWS.config.update({
    region: bucketRegion,
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: IdentityPoolId,
    }),
  });

  // Set up AWS S3
  const s3 = new AWS.S3({
    apiVersion: "2006-03-01",
    params: { Bucket: albumBucketName },
  });

  const fileName = selectedFile.name;
  const params = {
    // Key: fileName,
    // Key: directoryName + "/" + fileName,
    Key: directoryName + "/" + urlid + "/" + fileName,

    Body: selectedFile,
    // ACL: "public-read",
    // Adjust the ACL as needed
  };

  try {
    const data = await s3.upload(params).promise();
    setimageUrl(data.Location);
    console.log("File uploaded successfully:", data.Location);
  } catch (error) {
    console.log("Error uploading file:", error);
  }
};

// *****************************FETCH IN S3 BUCKET

const [selectedFile, setSelectedFile] = useState(null);
const [imageUrl, setImageUrl] = useState(null);
const [showimg, setShowImg] = useState(false);
const [changefileName, setchangeFileName] = useState(fileName1);

useEffect(() => {
  const albumBucketName = "bucket_name";
  const bucketRegion = "bucket_region";
  const IdentityPoolId = "IdentityPoolId";
  const directoryName = "diretory_name";

  AWS.config.update({
    region: bucketRegion,
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: IdentityPoolId,
    }),
  });

  const s3 = new AWS.S3({
    apiVersion: "2006-03-01",
    params: { Bucket: albumBucketName },
  });

  // const fileName = "test1.jpg";
  // setchangeFileName(fileName);

  // Replace with the actual file name

  // Generate a signed URL for the image
  const params = {
    Bucket: albumBucketName,
    // Key: directoryName + "/" + fileName,
    Key: directoryName + "/" + editedchilddata.id + "/" + changefileName,

    Expires: 60, // URL expiration time in seconds
  };

  s3.getSignedUrl("getObject", params, (err, url) => {
    if (err) {
      console.error("Error fetching image:", err);
    } else {
      setImageUrl(url);
    }
  });
}, [changefileName, editedchilddata.id]);

// *******************************UPDATE IN S3 BUCKET

const inputFileHandlerforUpdate = (e) => {
  setSelectedFile(e.target.files[0]);
};
const handleUploadforUpdate = async () => {
  if (!selectedFile) {
    console.error("No file selected");
    return;
  }

  const albumBucketName = "bucket_name";
  const bucketRegion = "bucket_region";
  const IdentityPoolId = "IdentityPoolId";
  const directoryName = "diretory_name";

  AWS.config.update({
    region: bucketRegion,
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: IdentityPoolId,
    }),
  });

  // Set up AWS S3
  const s3 = new AWS.S3({
    apiVersion: "2006-03-01",
    params: { Bucket: albumBucketName },
  });

  const fileName = selectedFile.name;
  setchangeFileName(fileName);
  const params = {
    // Key: fileName,
    // Key: directoryName + "/" + fileName,
    Key: directoryName + "/" + editedchilddata.id + "/" + changefileName,

    Body: selectedFile,
    // ACL: "public-read",
    // Adjust the ACL as needed
  };

  try {
    const data = await s3.upload(params).promise();
    if (data) {
      console.log("File uploaded successfully:", data.Location);
    } else {
      console.log("no logo available");
    }
    // }
  } catch (error) {
    console.log("Error uploading file:", error);
  }
};
