// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { CgProfile } from "react-icons/cg";
// import Button from "./Button";
// import Input from "./Input";
// import service from "../Appwrite/Config";

// const ProfilePhoto = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [imageLink, setImageLink] = useState(null);
//   const { register, handleSubmit } = useForm();

//   useEffect(() => {
//     service
//       .listfile2()
//       .then((file) => {
//         if (file) {
//           console.log(file.files[0].$id);
//           setImageLink(file.files[0].$id)
//         } else {
//           console.log("nofile");
//           setImageLink(null)
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);

//   // upload profile photo
//   const uploadProfilePhoto = async (data) => {
//     if (!data.image[0]) {
//       alert("Please select a file!");
//       return;
//     } else {
//       try {
//         const profileImg = await service.uploadFile2(data.image[0]);
//         console.log(profileImg);

//         if (profileImg) {
//           setImageLink(profileImg.$id);
//         }
//       } catch (error) {
//         console.error("Error uploading file:", error);
//         alert("Failed to upload file.");
//       }
//     }
//   };

//   return (
//     <>
//       {/* Profile Photo Icon */}
//       <div
//         className="profile-photo-icon"
//         onClick={() => setShowModal(true)}
//         style={{ cursor: "pointer" }}
//       >
//         {imageLink ? (
//           <img
//             src={service.getFilePreview2(imageLink)}
//             alt="Profile"
//             className="rounded-full w-10 h-10"
//           />
//         ) : (
//           <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-300">
//             <CgProfile className="w-full h-full object-cover" />
//           </div>
//         )}
//       </div>

//       {/* Modal */}
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
//           <div className="bg-white p-5 rounded-lg shadow-md w-96">
//             <h2 className="text-lg font-bold mb-4">Upload Profile Photo</h2>
//             <form onSubmit={handleSubmit(uploadProfilePhoto)}>
//               <Input
//                 type="file"
//                 className="mb-4"
//                 accept="image/png, image/jpg, image/jpeg, image/gif"
//                 {...register("image")}
//               />

//               <div className="flex justify-end space-x-3">
//                 <Button
//                   onClick={() => setShowModal(false)}
//                   type="button"
//                   className="px-4 py-2 bg-gray-300 rounded-lg"
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   type="submit"
//                   className="px-4 py-2 bg-blue-600 text-white rounded-lg"
//                 >
//                   Upload
//                 </Button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default ProfilePhoto;
