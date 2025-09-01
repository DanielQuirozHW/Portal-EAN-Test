// ** React Imports
import { createContext, useEffect, useState } from "react";
import axios from "axios";

// ** Next Import
import { useRouter } from "next/router";

import { auth, firestore, /*firebase,*/ storage, provider, firebase } from "../configs/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, signInWithPopup, getRedirectResult, OAuthProvider, signInWithRedirect, signInWithCredential, signInWithCustomToken, SAMLAuthProvider  } from "firebase/auth";
import { doc, collection, addDoc, query, where, getDoc, getDocs, updateDoc, onSnapshot, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { sendPasswordResetEmail } from "firebase/auth";
import { loginToken } from "@/redux/token";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { authMail, authPass, UrlApi } from "@/keys";
import Cookies from "js-cookie";

// ** Defaults
const defaultProvider = {
  user: null,
  loading: true,
  loadingECampus: false,
  setUser: () => null,
  setLoading: () => Boolean,
  setLoadingECampus: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
};
const AuthContext = createContext(defaultProvider);

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const tokenSelector = useSelector((store) => store.token.token);
  // ** States
  const [user, setUser] = useState(defaultProvider.user);
  const [loading, setLoading] = useState(defaultProvider.loading);
  const [loadingECampus, setLoadingECampus] = useState(defaultProvider.loadingECampus);
  const [token, setToken] = useState("");

  // ** Hooks
  const router = useRouter();

  const [empleado, setEmpleado] = useState({
    uid: '',
    idEmpleado: '',
    usuarioPortalRh: '',
    photoURL: '',
    photoPORTADA: '',
    puesto: '',
    habilitadoNovedad: '',
    habilitadoOrganigrama: ''
  }) //estos son los datos que vamos a completar en un login o en un registro para luego usarlos en llamadas a los fetch

  useEffect(() => {
    if (Object.keys(tokenSelector).length !== 0) {
      setToken(tokenSelector.token);
    }
  }, [tokenSelector]);

  useEffect(() => {
    dispatch(loginToken());
  }, []);

  useEffect(() => {
    let refreshInterval;
    let unsubscribeFirestore;

    const refreshToken = () => {
      dispatch(loginToken());
    };

    const startRefreshTimer = () => {
      refreshInterval = setInterval(refreshToken, 1800000); // Llamada cada 30 minutos
    };

    const stopRefreshTimer = () => {
      clearInterval(refreshInterval);
    };
    

    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const uid = currentUser.uid;
        const docRef = doc(firestore, "usuarios", uid);
        try {
          // Inicia el listener de Firestore
          unsubscribeFirestore = onSnapshot(docRef, (docSnapshot) => {
            if (docSnapshot.exists()) {
              const userData = docSnapshot.data();
              const {
                nombre,
                empleadoid,
                email,
                photoURL,
                photoPORTADA,
                puesto,
                habilitadoNovedad,
                habilitadoOrganigrama,
                tieneED,
              } = userData;

              setUser({
                uid,
                nombre,
                empleadoid,
                photoURL,
                photoPORTADA,
                puesto,
                email,
                habilitadoNovedad,
                habilitadoOrganigrama,
                tieneED,
              });
            } else {
              setUser(null);
            }
            setLoading(false);
          });
        } catch (error) {
          setLoading(false);
        }
  
        dispatch(loginToken());
        startRefreshTimer();
      } else {
        setUser(null);
        setToken(null);
        stopRefreshTimer();
  
        if (unsubscribeFirestore) unsubscribeFirestore();
        setLoading(false);
      }
    });
  
    return () => {
      unsubscribeAuth();
      if (unsubscribeFirestore) unsubscribeFirestore();
    };
  }, []);
  
  
  const handleRegister = async (params) => {
    try {
      let responseContac = null;
      const entidad = "new_empleados";
      const fetch = `<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>
        <entity name='new_empleado'>
          <attribute name='new_name' />
          <attribute name='new_correoelectronico' />
          <attribute name='new_empleadoid' />
          <attribute name="new_puesto" />
          <attribute name='ownerid' />
          <order attribute='new_numerolegajo' descending='false' />
          <filter type='and'>
            <condition attribute='new_correoelectronico' operator='eq' value='${params.email}' />
          </filter>
        </entity>
      </fetch>
      `;
      try {
        responseContac = await axios.post(
          `${UrlApi}api/consultafetchs`,
          {
            entidad: entidad,
            fetch: fetch,
          },
          {
            headers: {
              Authorization: `Bearer ${tokenSelector.token}`,
            },
          }
        );
      } catch (error) {
        // Manejar errores de la solicitud de contacto aquí
      }

      if (responseContac && responseContac?.data.length > 0) {
        let datosContacto = responseContac.data[0];
        let empleadoid = datosContacto.new_empleadoid;
        let ownerid = datosContacto["_ownerid_value"];
        let fullname = datosContacto.new_name;
        let puestoId = datosContacto._new_puesto_value;

        // Crea un nuevo usuario en Firebase con correo y contraseña
        const response = await createUserWithEmailAndPassword(auth, params.email, params.password);
        const uid = response.user.uid;

        // Guarda datos en el local storage
        window.localStorage.setItem("userData", JSON.stringify(response.user));
        // Agrega un registro en la colección 'usuarios' en Firestore


        const docRef = doc(firestore, "usuarios", uid);
        await setDoc(docRef, { email: params.email, empleadoid, fullname, puestoId, fullname, ownerid, uid, fullname, }); // Para no crear nuevos documentos con id aleatorio

        // const usersCollection = collection(firestore, "usuarios"); // Utiliza la función collection de firestore
        // await addDoc(usersCollection, {
        //   email: params.email,
        //   empleadoid,
        //   fullname,
        //   puestoId,
        //   fullname,
        //   ownerid,
        //   uid,
        //   fullname,
        // });
        router.replace("/");
      } else {
        throw new Error("No existe una cuenta con ese correo en nuestro sistema");
      }
    } catch (error) {
      throw error;
    }
  };

  const handleError = (error) => {
    if (error.code === 'auth/account-exists-with-different-credential') {
      toast.error('Ya existe una cuenta con diferentes credenciales. Si te registraste con correo y contraseña, debes usar ese metodo.', {
        theme: "dark",
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      console.error('Error de inicio de sesión', error.code, error.message);
      toast.error('Hubo un error al iniciar sesión, por favor intente más tarde', {
        theme: "dark",
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  
  
const handleLogin = async (params) => {
  try {
    const result = await signInWithEmailAndPassword(auth, params.email, params.password);
    const user = result.user;

    // Mostrar toast de carga
    const toastId = toast.loading("Cargando...", {
      theme: "dark",
      position: "top-center",
      autoClose: false,
      closeOnClick: false,
      draggable: false,
      pauseOnHover: true,
    });

    const verificacion = async () => {
      try {
        const resp = await axios.post(`${UrlApi}api/Usuarios/login`, {
          email: authMail,
          password: authPass,
        });
        const token = resp.data.token || resp.data;

        const entidad = "new_alumnos";
        const fetch =
          "<entity name='new_alumno'>" +
          "<attribute name='new_name'/>" +
          "<attribute name='new_correoelectronico'/>" +
          "<attribute name='new_alumnoid'/>" +
          "<order attribute='new_name' descending='false'/>" +
          "<filter type='and'>" +
          `<condition attribute='new_correoelectronico' operator='eq' value='${user.email}'/>` +
          `<condition attribute='new_tieneusuarioportalalumno' operator='eq' value='true'/>` +
          "</filter>" +
          "</entity>";

        const respMail = await axios.post(
          `${UrlApi}api/consultafetchs`,
          { entidad, fetch },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (!respMail.data || respMail.data.length === 0) {
          // Usuario sin acceso
          toast.dismiss(toastId); // Ocultar carga
          toast.error("Acceso denegado. No tienes permisos para ingresar al portal.", {
            theme: "dark",
            position: "top-center",
            autoClose: 5000,
          });

          // Desautenticar usuario
          await signOut(auth);
          return;
        }

        const respEmpleado = respMail.data[0];

        const docRef = doc(firestore, "usuarios", user.uid);
        const docSnapshot = await getDoc(docRef);

        const userDataToSave = {
          nombre: respEmpleado.new_name || "",
          empleadoid: respEmpleado.new_alumnoid || "",
          photoURL: "",
          photoPORTADA: "",
          puesto: user.email.endsWith("@docente.com") ? "docente" : "codocente",
          email: user.email,
        };

        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          userDataToSave.photoURL = userData.photoURL || "";
          userDataToSave.photoPORTADA = userData.photoPORTADA || "";
          await updateDoc(docRef, userDataToSave);
        } else {
          await setDoc(docRef, userDataToSave);
        }

        toast.dismiss(toastId); // Ocultar carga
        toast.success("Autenticación exitosa", {
          theme: "dark",
          position: "top-center",
          autoClose: 2000,
        });

        router.replace("/");
      } catch (error) {
        toast.dismiss(toastId);
        console.error(error);
        toast.error("Hubo un error al iniciar sesión, por favor intente más tarde", {
          theme: "dark",
          position: "top-center",
          autoClose: 5000,
        });
      }
    };

    await verificacion();
  } catch (error) {
    handleError(error);
  }
};

  const signInWithMicrosoftCodocente = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Mostrar toast loading con texto "Cargando..."
      const toastId = toast.loading("Cargando...", {
        theme: "dark",
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        pauseOnHover: true,
      });

      const verificacion = async () => {
        try {
          // Login para obtener token
          const resp = await axios.post(`${UrlApi}api/Usuarios/login`, {
            email: authMail,
            password: authPass,
          });
          const token = resp.data.token || resp.data;

          // Construcción del FetchXML para la consulta
          const entidad = "new_empleados";
          const fetch =
            "<entity name='new_empleado'>" +
            "<attribute name='new_name'/>" +
            "<attribute name='new_cuitcuil'/>" +
            "<attribute name='new_correoelectronico'/>" +
            "<attribute name='new_numerolegajo'/>" +
            "<attribute name='new_empleadoid'/>" +
            "<attribute name='new_usuarioportalrh'/>" +
            "<attribute name='new_roldocente'/>" +
            "<attribute name='new_puesto'/>" +
            "<attribute name='new_habilitadocargadenovedadesdepago'/>" +
            "<attribute name='new_habilitadoparaorganigrama'/>" +
            "<attribute name='new_tieneaccesonuevoportalcodocente'/>" +
            "<order attribute='new_numerolegajo' descending='false'/>" +
            "<filter type='and'>" +
            `<condition attribute='new_correoelectronico' operator='eq' value='${user.email}'/>` +
            "<condition attribute='new_tieneaccesonuevoportalcodocente' operator='eq' value='true' />" +
            "</filter>" +
            "</entity>";

          // Consulta a API con token
          const respMail = await axios.post(
            `${UrlApi}api/consultafetchs`,
            { entidad, fetch },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          if (!respMail.data || respMail.data.length === 0) {
            // Usuario sin acceso
            toast.dismiss(toastId); // ocultar carga
            toast.error("Acceso denegado. No tienes permisos para ingresar al portal.", {
              theme: "dark",
              position: "top-center",
              autoClose: 5000,
            });

            // Desautenticar usuario y no redirigir
            await signOut(auth);
            return; // Terminar función
          }

          const respEmpleado = respMail.data[0];
          const docRef = doc(firestore, "usuarios", user.uid);
          const docSnapshot = await getDoc(docRef);

          const userDataToSave = {
            nombre: respEmpleado.new_name || "",
            empleadoid: respEmpleado.new_empleadoid || "",
            photoURL: "",
            photoPORTADA: "",
            puesto: "codocente",
            email: user.email,
            habilitadoNovedad: respEmpleado.new_habilitadocargadenovedadesdepago ?? false,
            habilitadoOrganigrama: respEmpleado.new_habilitadoparaorganigrama ?? false,
            tieneED: false,
          };

          if (docSnapshot.exists()) {
            const userData = docSnapshot.data();
            // Mantener fotos si existen
            userDataToSave.photoURL = userData.photoURL || "";
            userDataToSave.photoPORTADA = userData.photoPORTADA || "";
            await updateDoc(docRef, userDataToSave);
          } else {
            await setDoc(docRef, userDataToSave);
          }

          toast.dismiss(toastId); // ocultar carga
          toast.success("Autenticación exitosa", {
            theme: "dark",
            position: "top-center",
            autoClose: 2000,
          });

          router.replace("/"); // Redirigir al home

        } catch (error) {
          toast.dismiss(toastId);
          console.error(error);
          toast.error("Hubo un error al iniciar sesión, por favor intente más tarde", {
            theme: "dark",
            position: "top-center",
            autoClose: 5000,
          });
        }
      };

      await verificacion();
    } catch (error) {
      handleError(error);
    }
  };



  const signInWithMicrosoftAdmin = (data) => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        let respEmpleado;
        let token = '';

        const verificacion = () =>
          new Promise(async (resolve, reject) => {
            try {
              const resp = await axios.post(`${UrlApi}api/Usuarios/login`, {
                email: authMail,
                password: authPass,
              });
              token = resp.data;
  
              const entidad = 'new_empleados';
              const fetch =
                "<entity name='new_empleado'>" +
                "<attribute name='new_name'/>" +
                "<attribute name='new_cuitcuil'/>" +
                "<attribute name='new_correoelectronico'/>" +
                "<attribute name='new_numerolegajo'/>" +
                "<attribute name='new_empleadoid'/>" +
                "<attribute name='new_usuarioportalrh'/>" +
                "<attribute name='new_roldocente'/>" +
                "<attribute name='new_puesto'/>" +
                "<attribute name='new_habilitadocargadenovedadesdepago'/>" +
                "<attribute name='new_tieneaccesonuevoportalcodocente'/>" +
                "<attribute name='new_habilitadoparaorganigrama'/>" +
                "<order attribute='new_numerolegajo' descending='false'/>" +
                "<filter type='and'>" +
                  "<condition attribute='new_correoelectronico' operator='eq' value='" + data.email + "'/>" +
                  "<condition attribute='new_tieneaccesonuevoportalcodocente' operator='eq' value='true' />" +
                "</filter>" +
                "</entity>";

                const respMail = await axios.post(
                `${UrlApi}api/consultafetchs`,
                {
                  entidad: entidad,
                  fetch: fetch,
                },
                {
                  headers: {
                    Authorization: `Bearer ${token.token}`,
                  },
                }
              );
  
              if (respMail.data && respMail.data.length === 0) {
                reject('No existe una cuenta con ese correo en nuestro sistema');
                window.location.href = '/acceso-denegado';
                signOut(auth).then(() => {
                    console.log('Usuario desautenticado');
                }).catch((signOutError) => {
                    console.error('Error al desautenticar:', signOutError);
                })
              } else {
                respEmpleado = respMail.data[0];

                const docRef = doc(firestore, "usuarios", user.uid);
                const docSnapshot = await getDoc(docRef);
                if (docSnapshot.exists()) {
                  const userData = docSnapshot.data();
                  const { photoURL, photoPORTADA, admin } = userData;

                  if (!admin) {
                    toast.error('No tienes permisos de administrador para acceder a esta plataforma', {
                      theme: "dark",
                      position: "top-center",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    });
                
                    window.location.href = '/acceso-denegado';
                    await signOut(auth);
                    console.log('Usuario desautenticado por falta de permisos de administrador');
                    return;
                  }


                  // No pisar el EsAdmin

                  const updatedUserData = {
                    nombre: respEmpleado.new_name || '',
                    empleadoid: respEmpleado.new_empleadoid || '',
                    photoURL: photoURL || '',
                    photoPORTADA: photoPORTADA || '',
                    // El problema con cambiar también las fotos, es que se pierden las reales del admin, no están guardadas en BO.           
                    // En todo caso poner imágenes de enmascarado.
                    puesto: data.role,
                    email: data.email,
                    habilitadoNovedad: respEmpleado.new_habilitadocargadenovedadesdepago ?? false,
                    habilitadoOrganigrama: respEmpleado.new_habilitadoparaorganigrama ?? false,
                  };
                  await updateDoc(docRef, updatedUserData);
                  setUser(updatedUserData);
        
                } else {  // Si no existe documento
                  toast.error('No tienes permisos de administrador o tu usuario no existe en el sistema', {
                    theme: "dark",
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
    
                  window.location.href = '/acceso-denegado';
                  await signOut(auth);
                  reject('Usuario no encontrado o sin permisos de administrador');
                  return;
                  
                }
  
                // Redirigir al usuario al inicio después de crear el registro o si ya existe
                router.replace('/');
                resolve();
              }
            } catch (error) {
              console.log(error);
              reject('Hubo un error al iniciar sesión, por favor intente más tarde');
            }
          });
  
        toast.promise(
          verificacion(),
          {
            pending: 'Autenticando...',
            error: {
              render({ data }) {
                console.log(data)
                return `${data}`;
              },
            },
          },
          {
            theme: 'dark',
            position: 'top-center',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        ).then(() => {
          router.replace('/');
        }).catch((error) => {
          console.log(error);
        });
      })
      .catch((error) => {
        console.log(error)
        handleError(error);
      });
  };

  const handleForgotPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      console.log("Se ha enviado un correo electrónico de recuperación de contraseña.");
    } catch (error) {
      throw error;
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    window.localStorage.removeItem("userData");
    Cookies.remove("userData", { path: "/" });
    router.push("/");
  };

  const actualizarFotoPerfil = async (imgEditada) => {
    const toastLoading = toast.loading("Loading...");

    try {
      const storageRef = ref(storage, `${user.uid}/foto perfil`);
      await uploadBytes(storageRef, imgEditada);
      const imgURL = await getDownloadURL(storageRef);

      if (user.uid) {
        // Obtener referencia directa al documento por ID
        const userRef = doc(firestore, "usuarios", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          await updateDoc(userRef, { photoURL: imgURL });

          setUser((prevUser) => ({
            ...prevUser,
            photoURL: imgURL,
          }));

          toast.dismiss(toastLoading);
          toast.success("Tu foto se ha cargado correctamente.");
        } else {
          toast.error("Usuario no encontrado.");
        }
      } else {
        toast.error("UID de usuario no definido.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar la foto de perfil");
    }
  };


  const actualizarFotoPortada = async (imgEditada) => {
    // Referencia a Storage
    const storageRef = ref(storage, `${user.uid}/foto portada`);
    const toastLoading = toast.loading("Cargando...");
    // Subir la imagen editada a Storage
    await uploadBytes(storageRef, imgEditada);

    // Obtener la URL directa de la imagen
    const imgURL = await getDownloadURL(storageRef);

    // Asegúrate de que user.uid tenga un valor definido
    if (user.uid) {
      // Referencia a Firestore
      const usuariosRef = collection(firestore, "usuarios");
      const userQuery = query(usuariosRef, where("uid", "==", user.uid));
      const querySnapshot = await getDocs(userQuery);

      if (querySnapshot.docs.length > 0) {
        const userDoc = querySnapshot.docs[0];
        const userRef = doc(usuariosRef, userDoc.id);

        // Actualizar la propiedad 'photoURL' en Firestore
        await updateDoc(userRef, { photoPORTADA: imgURL });

        // Actualizar solo la propiedad photoURL en el estado del componente
        setUser((prevUser) => ({
          ...prevUser,
          photoPORTADA: imgURL,
        }));

        toast.dismiss(toastLoading);
        toast.success("Tu foto se ha cargado correctamente.");
      } else {
        toast.error("Usuario no encontrado.");
      }
    } else {
      toast.error("UID de usuario no definido.");
    }
  };

  
  const handleLoginSAML = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const toastId = toast.loading("Cargando...", {
        theme: "dark",
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        pauseOnHover: true,
      });

      const verificacion = async () => {
        try {
          const resp = await axios.post(`${UrlApi}api/Usuarios/login`, {
            email: authMail,
            password: authPass,
          });
          const token = resp.data.token || resp.data;

          const entidad = "new_alumnos";
          const fetch =
            "<entity name='new_alumno'>" +
            "<attribute name='new_name'/>" +
            "<attribute name='new_correoelectronico'/>" +
            "<attribute name='new_alumnoid'/>" +
            "<order attribute='new_name' descending='false'/>" +
            "<filter type='and'>" +
            `<condition attribute='new_correoelectronico' operator='eq' value='${user.email}'/>` +
            `<condition attribute='new_tieneusuarioportalalumno' operator='eq' value='true'/>` +
            "</filter>" +
            "</entity>";

          const respMail = await axios.post(
            `${UrlApi}api/consultafetchs`,
            { entidad, fetch },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          if (!respMail.data || respMail.data.length === 0) {
            toast.dismiss(toastId);
            toast.error("Acceso denegado. No tienes permisos para ingresar al portal.", {
              theme: "dark",
              position: "top-center",
              autoClose: 5000,
            });

            await signOut(auth);
            return;
          }

          const respEmpleado = respMail.data[0];

          const docRef = doc(firestore, "usuarios", user.uid);
          const docSnapshot = await getDoc(docRef);

          const userDataToSave = {
            nombre: respEmpleado.new_name || "",
            empleadoid: respEmpleado.new_alumnoid || "",
            photoURL: "",
            photoPORTADA: "",
            puesto: "codocente",
            email: user.email,
          };

          if (docSnapshot.exists()) {
            const userData = docSnapshot.data();
            userDataToSave.photoURL = userData.photoURL || "";
            userDataToSave.photoPORTADA = userData.photoPORTADA || "";
            await updateDoc(docRef, userDataToSave);
          } else {
            await setDoc(docRef, userDataToSave);
          }

          toast.dismiss(toastId);
          toast.success("Autenticación exitosa", {
            theme: "dark",
            position: "top-center",
            autoClose: 2000,
          });

          router.replace("/");
        } catch (error) {
          toast.dismiss(toastId);
          console.error(error);
          toast.error("Hubo un error al iniciar sesión, por favor intente más tarde", {
            theme: "dark",
            position: "top-center",
            autoClose: 5000,
          });
        }
      };

      await verificacion();
    } catch (error) {
      handleError(error);
    }
  };


  const values = {
    user,
    loading,
    loadingECampus,
    token, // Agregamos el token aquí
    user,
    setLoading,
    login: handleLogin,
    loginSAML: handleLoginSAML,
    loginCodocente: signInWithMicrosoftCodocente,
    loginAdmin: signInWithMicrosoftAdmin,
    logout: handleLogout,
    register: handleRegister,
    forgotPassword: handleForgotPassword,
    actualizarFotoPerfil,
    actualizarFotoPortada,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
