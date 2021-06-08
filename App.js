import React, {useCallback, useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {BarCodeScanner} from "expo-barcode-scanner";
import rsa from 'js-crypto-rsa';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = useCallback(({ type, data }) => {

    const genPass = '125448'

    setScanned(true);

    //alert(`Bar code signature check = ${genPass} length = ${genPass.length}`);

    rsa.generateKey(2048).then( (key) => {
      const publicKey = key.publicKey
      publicKey.n = "m6aT_g3ZQMPOpXGMmBmZzXWQ938-gY9clNDmD6bOagXNNrItX6gzlFfnn_Au1J64sYGe3RB-CcfyWw1kKLLEkqIaeKMZAoL7Nffm_GGwFJzncMwuMSi8ZVuD1-Fgb2FDAIEGKgssbf2XUo-L25ytJiPYo0qBFoUPEYpHKnP4Ws7NN-Qswl1Vz3zoXWw6RYu7L6UyJA_eF95ERtDXkPqRCYjNUYVbfoAJrLK_iYjFX1cJ1zQwBotjum-Wt_lgvHkRfwX75_4_cTJcdsSsdmuG4roTQqrTWpfwhd1pNgsTNPShAHKlccXoS_M6l-f2dXd5ca7dE7Hv5quj62QCLbelsQ"
      const privateKey = key.privateKey;
      privateKey.d = "AXFm3yCeR79RnNjEGaoRzAhqjlZz-gBf3KWmKVSbM4yIDtQhjgqM1DA1hKTEhS_EzlmNfwwhm4l_blYR4Lg5ttfp4NtZk3cyGK5rc56OK43-cvZV8hpmXBLXf5Op6CAphHnXQHbowavaV2P6seSRFYE3ySWzWaNkvxJJiaNuyLFdigmKi4MBproGFJnPM_GDTa8_O-ydARHREggwOgbeU0TDIB8wU4QYS7CANyvMnCHQdLwuv7NNEJ_DYTKzfPdkrKI4JkGKdEGDhRqiZQkD0f0W0tuKlKJiauPTvP_Y_WDg2-L-iZe2ckX5EqZeIFJ3JPK7x2zOfICrU1EXxZwkQQ"
      privateKey.dp = "BEZowA-AwrJ6pOz0dxZzcMJcEtdUkoeMAAfOHuQOaKWR5I2MYByk6EKg2C1goCqTE8QpmGpe5xrzf26e20mhrCvTmiTbx-LDas1ZGtJwawUZR-ZxC1G50S5aK0Jj5obFwguE0lYp3anRGfnMGUbIvzZZMeaJ3wseIFxO_VGD_xs"
      privateKey.dq = "V0m4_V_EL5srghqw1zDJeYSgdpOgdWEGHtJxsb5uvQlIYXPzJ6pBKjRH9RUGGPrOpNE9yLUgewp0KEzhvv-pdyW4CYtT5z0AwPb6ueaKPx3QKDztoovUmX14mW9QcTCmbt9cySDlExZmnCNiKF2W-a4JZJixUcmWMQlMJZOZdHs"
      privateKey.n = "m6aT_g3ZQMPOpXGMmBmZzXWQ938-gY9clNDmD6bOagXNNrItX6gzlFfnn_Au1J64sYGe3RB-CcfyWw1kKLLEkqIaeKMZAoL7Nffm_GGwFJzncMwuMSi8ZVuD1-Fgb2FDAIEGKgssbf2XUo-L25ytJiPYo0qBFoUPEYpHKnP4Ws7NN-Qswl1Vz3zoXWw6RYu7L6UyJA_eF95ERtDXkPqRCYjNUYVbfoAJrLK_iYjFX1cJ1zQwBotjum-Wt_lgvHkRfwX75_4_cTJcdsSsdmuG4roTQqrTWpfwhd1pNgsTNPShAHKlccXoS_M6l-f2dXd5ca7dE7Hv5quj62QCLbelsQ"
      privateKey.p = "08Vf34qC2C95NYWXIacXpcpeRe54t3XxmWhTVupi0iLvMHXT0Pu_KL0Rw6vKHmsNatuxKfuccJaozksiO04qiCB2zZXymVtj9InA87ilJN1r-Pr1T61m7H1DEbd39CIcaLyi5hF0QoChub1zVw1bIzxB1oodVMAtkKDdraq6RE8"
      privateKey.q = "vCinuSRLvjc-_E4helFCv-ofxW4Ah9BWW0Nbkk1raYwzQG0Ht9VvMWFDalSVJ-Tq2omXa6Bj1OEmZOZcXmtcmp9A0jJzBmYJQxCX-b769BGtJTwlAshX87Cy-JTAJ1k1hfjw48xI4qJffWb9f0Cv4BzbUYRStRwZHUXWv47S9f8"
      privateKey.qi = "WnjrWwn-8JpXMQrBYrYdgTayup_Ir-J693-rDIqxchkW03VwLEEYxtY1Nh0R_gZTuC2aZ6nb8e8Q5vjcjDNSxMh-IXjBjTMYIJOGJg-2TolPl0TMQU2o0AvfL7fLX5l2RfbhjIJqiFBMwJ8QUuFCTKFbCoWFXE9W30Su2h0snr0"

      const bytePass = new TextEncoder().encode(genPass)

      rsa.encrypt(
          bytePass,
          publicKey,
      ).then( (encrypted) => {

        const str_enc = String.fromCharCode(...encrypted)

        var bytes = new Uint8Array(256);
        for(var i = 0; i < str_enc.length; i++) {
          var char = str_enc.charCodeAt(i);
          bytes[i] = (char & 0xFF);
        }

        console.log(bytes)


        return rsa.decrypt(
            encrypted,
            privateKey,
        );
      }).then( (decrypted) => {
        const str = new TextDecoder().decode(decrypted)
        alert(`Bar code signature check = ${str} length = ${str.length}`);
      });
    })

    //alert(`Bar code signature check = ${data} length = ${data.length}`);


    //   (async () => {
    //   setScanned(true);
    //   try {
    //     await  rsa.generateKey(2048).then((key) => {
    //       const publicKey = key.publicKey
    //       publicKey.n = "m6aT_g3ZQMPOpXGMmBmZzXWQ938-gY9clNDmD6bOagXNNrItX6gzlFfnn_Au1J64sYGe3RB-CcfyWw1kKLLEkqIaeKMZAoL7Nffm_GGwFJzncMwuMSi8ZVuD1-Fgb2FDAIEGKgssbf2XUo-L25ytJiPYo0qBFoUPEYpHKnP4Ws7NN-Qswl1Vz3zoXWw6RYu7L6UyJA_eF95ERtDXkPqRCYjNUYVbfoAJrLK_iYjFX1cJ1zQwBotjum-Wt_lgvHkRfwX75_4_cTJcdsSsdmuG4roTQqrTWpfwhd1pNgsTNPShAHKlccXoS_M6l-f2dXd5ca7dE7Hv5quj62QCLbelsQ"
    //       const privateKey = key.privateKey;
    //       privateKey.d = "AXFm3yCeR79RnNjEGaoRzAhqjlZz-gBf3KWmKVSbM4yIDtQhjgqM1DA1hKTEhS_EzlmNfwwhm4l_blYR4Lg5ttfp4NtZk3cyGK5rc56OK43-cvZV8hpmXBLXf5Op6CAphHnXQHbowavaV2P6seSRFYE3ySWzWaNkvxJJiaNuyLFdigmKi4MBproGFJnPM_GDTa8_O-ydARHREggwOgbeU0TDIB8wU4QYS7CANyvMnCHQdLwuv7NNEJ_DYTKzfPdkrKI4JkGKdEGDhRqiZQkD0f0W0tuKlKJiauPTvP_Y_WDg2-L-iZe2ckX5EqZeIFJ3JPK7x2zOfICrU1EXxZwkQQ"
    //       privateKey.dp = "BEZowA-AwrJ6pOz0dxZzcMJcEtdUkoeMAAfOHuQOaKWR5I2MYByk6EKg2C1goCqTE8QpmGpe5xrzf26e20mhrCvTmiTbx-LDas1ZGtJwawUZR-ZxC1G50S5aK0Jj5obFwguE0lYp3anRGfnMGUbIvzZZMeaJ3wseIFxO_VGD_xs"
    //       privateKey.dq = "V0m4_V_EL5srghqw1zDJeYSgdpOgdWEGHtJxsb5uvQlIYXPzJ6pBKjRH9RUGGPrOpNE9yLUgewp0KEzhvv-pdyW4CYtT5z0AwPb6ueaKPx3QKDztoovUmX14mW9QcTCmbt9cySDlExZmnCNiKF2W-a4JZJixUcmWMQlMJZOZdHs"
    //       privateKey.n = "m6aT_g3ZQMPOpXGMmBmZzXWQ938-gY9clNDmD6bOagXNNrItX6gzlFfnn_Au1J64sYGe3RB-CcfyWw1kKLLEkqIaeKMZAoL7Nffm_GGwFJzncMwuMSi8ZVuD1-Fgb2FDAIEGKgssbf2XUo-L25ytJiPYo0qBFoUPEYpHKnP4Ws7NN-Qswl1Vz3zoXWw6RYu7L6UyJA_eF95ERtDXkPqRCYjNUYVbfoAJrLK_iYjFX1cJ1zQwBotjum-Wt_lgvHkRfwX75_4_cTJcdsSsdmuG4roTQqrTWpfwhd1pNgsTNPShAHKlccXoS_M6l-f2dXd5ca7dE7Hv5quj62QCLbelsQ"
    //       privateKey.p = "08Vf34qC2C95NYWXIacXpcpeRe54t3XxmWhTVupi0iLvMHXT0Pu_KL0Rw6vKHmsNatuxKfuccJaozksiO04qiCB2zZXymVtj9InA87ilJN1r-Pr1T61m7H1DEbd39CIcaLyi5hF0QoChub1zVw1bIzxB1oodVMAtkKDdraq6RE8"
    //       privateKey.q = "vCinuSRLvjc-_E4helFCv-ofxW4Ah9BWW0Nbkk1raYwzQG0Ht9VvMWFDalSVJ-Tq2omXa6Bj1OEmZOZcXmtcmp9A0jJzBmYJQxCX-b769BGtJTwlAshX87Cy-JTAJ1k1hfjw48xI4qJffWb9f0Cv4BzbUYRStRwZHUXWv47S9f8"
    //       privateKey.qi = "WnjrWwn-8JpXMQrBYrYdgTayup_Ir-J693-rDIqxchkW03VwLEEYxtY1Nh0R_gZTuC2aZ6nb8e8Q5vjcjDNSxMh-IXjBjTMYIJOGJg-2TolPl0TMQU2o0AvfL7fLX5l2RfbhjIJqiFBMwJ8QUuFCTKFbCoWFXE9W30Su2h0snr0"
    //       //const str_enc = data.slice(0,256)
    //       const str_enc = data
    //       var bytes = new Uint8Array(256);
    //       for(var i = 0; i < str_enc.length; i++) {
    //         var char = str_enc.charCodeAt(i);
    //         bytes[i] = (char & 0xFF);
    //       }
    //
    //       rsa.decrypt(
    //           bytes,
    //           privateKey,
    //       ).then((decrypted) => {
    //         const text = new TextDecoder().decode(decrypted)
    //         alert(`Password = ${text}`);
    //       })
    //     })
    //   } catch (e){
    //     console.log(e)
    //   }
    // })();

  },[]);

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
      <View style={styles.container}>
        <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
        />
        {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
