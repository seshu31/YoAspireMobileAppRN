import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import axios from 'axios';
import Textarea from 'react-native-textarea';
import {useForm, Controller} from 'react-hook-form';
import {useNavigation, useRoute} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Picker} from '@react-native-picker/picker';
import normalize from 'react-native-normalize';
import theme from '../../theme';
import CameraOptionsModal from '../reusables/CameraOptionsModal';

const CreatePost = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  var post = false;
  const [category, setCategory] = useState(() =>
    post ? post.Category_Type : 'article',
  );
  const [visibility, setVisibility] = useState(() =>
    post ? post.Visibility : 0,
  );
  const [image, setImage] = useState(() => (post ? post.Image : null));
  const [showCameraOptions, setShowCameraOptions] = useState(false);

  const handleSubmitPost = data => {
    console.log(data, visibility, category);
  };

  const handeleVisibility = data => {
    setVisibility(data);
  };

  const handleCategory = data => {
    setCategory(data);
  };

  const deleteHandler = () => {
    // setLoading(true);
    // getToken().then(token => {
    //   axios
    //     .delete(`${backend_url}/post/${post.PostId}`, {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     })
    //     .then(response => {
    //       setLoading(false);
    //       alert('Post deleted successfully');
    //       navigation.navigate('Home');
    //     })
    //     .catch(err => {
    //       setLoading(false);
    //       alert('Something went wrong. Please, Try again');
    //       navigation.navigate('Home');
    //     });
    // });
    console.log('deleted');
  };

  const dialogHandler = () =>
    Alert.alert(
      'Are you sure?',
      'You want to delete this post',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'OK', onPress: deleteHandler},
      ],
      {cancelable: false},
    );

  // Function to handle image selection
  const imageHandler = async () => {
    // setShowCameraOptions(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.5}>
          <MaterialIcons
            name="arrow-back-ios"
            size={normalize(theme.iconSizes.medium)}
            color={theme.colors.primary}
          />
        </TouchableOpacity>
        {post ? (
          <>
            <Text style={styles.title}>Edit Post </Text>
            <Text
              style={styles.postButton}
              onPress={handleSubmit(handleSubmitPost)}>
              Save
            </Text>
          </>
        ) : (
          <>
            <Text style={styles.title}>Create New Post </Text>
            <Text
              style={styles.postButton}
              onPress={handleSubmit(handleSubmitPost)}>
              Post
            </Text>
          </>
        )}
      </View>
      <ScrollView
        contentContainerStyle={[
          styles.postForm,
          // {opacity: loading ? 0.25 : 1},
        ]}>
        {route.params && route.params.group && !post ? (
          <Text style={styles.groupText}>
            You're creating posts in {route.params.group} group
          </Text>
        ) : null}
        {post && post.groupid ? (
          <Text style={styles.groupText}>
            You're editing posts in {post.group_name} group
          </Text>
        ) : null}

        <Controller
          control={control}
          name="description"
          defaultValue={post ? post.Description : ''}
          render={({field: {onChange, onBlur, value}}) => (
            <Textarea
              containerStyle={styles.textareaContainer}
              style={styles.textareaField}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
              placeholder={'Say Something'}
              placeholderTextColor={theme.colors.placeholdercolor}
            />
          )}
          rules={{
            required: true,
            maxLength: 500,
          }}
        />
        {errors.description && errors.description.type === 'required' && (
          <Text style={styles.errorText}>Description field is required.</Text>
        )}
        {errors.description && errors.description.type === 'maxLength' && (
          <Text style={styles.errorText}>
            Description should consists maximum of 500 characters.
          </Text>
        )}
        <Text style={styles.dropdownLabel}>Visibility</Text>
        <Picker
          selectedValue={visibility}
          onValueChange={handeleVisibility}
          prompt="Visibility Status"
          style={styles.picker}
          dropdownIconColor={theme.colors.black}>
          <Picker.Item label="Public" value="Public" />
          <Picker.Item label="Connections" value="Connections" />
        </Picker>
        <View style={styles.horizontalLine} />
        <Text style={styles.dropdownLabel}>Category</Text>
        <Picker
          selectedValue={category}
          onValueChange={handleCategory}
          prompt="Category"
          style={styles.picker}
          dropdownIconColor={theme.colors.black}>
          <Picker.Item label="Article" value="article" />
          <Picker.Item label="Webinar" value="webinar" />
          <Picker.Item label="Job" value="job" />
        </Picker>
        <View style={styles.horizontalLine} />
        <Controller
          control={control}
          name="title"
          defaultValue={post ? post.Title : ''}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              placeholder="Title"
              style={styles.textField}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
              placeholderTextColor={theme.colors.placeholdercolor}
            />
          )}
          rules={{
            required: true,
            maxLength: 30,
          }}
        />
        {errors.title && errors.title.type === 'required' && (
          <Text style={styles.errorText}>Title field is required.</Text>
        )}
        {errors.title && errors.title.type === 'maxLength' && (
          <Text style={styles.errorText}>
            Title should consists maximum of 30 characters.
          </Text>
        )}
        <Controller
          control={control}
          name="brief"
          defaultValue={post ? post.Brief : ''}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              placeholder="Brief"
              style={styles.textField}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
              placeholderTextColor={theme.colors.placeholdercolor}
            />
          )}
          rules={{
            required: category !== 'article' ? true : false,
            maxLength: 50,
          }}
        />
        {errors.brief && errors.brief.type === 'required' && (
          <Text style={styles.errorText}>Brief field is required.</Text>
        )}
        {errors.brief && errors.brief.type === 'maxLength' && (
          <Text style={styles.errorText}>
            Brief should consists maximum of 50 characters.
          </Text>
        )}
        {/* {category !== 'article' ? ( */}
        <Controller
          control={control}
          name="link"
          defaultValue={post ? post.Link : ''}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              placeholder="Link"
              style={styles.textField}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
              placeholderTextColor={theme.colors.placeholdercolor}
            />
          )}
          rules={{
            required: true,
            maxLength: 200,
          }}
        />
        {/* ) : null} */}
        {errors.link && errors.link.type === 'required' && (
          <Text style={styles.errorText}>Link field is required.</Text>
        )}
        {errors.link && errors.link.type === 'maxLength' && (
          <Text style={styles.errorText}>
            Link should consists maximum of 200 characters.
          </Text>
        )}
        <Controller
          control={control}
          name="hashtags"
          defaultValue={post ? post.Hashtags : ''}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              placeholder="Multiple Hash Tags should be seperated by comma"
              style={styles.textField}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
              placeholderTextColor={theme.colors.placeholdercolor}
            />
          )}
          rules={{
            maxLength: 100,
          }}
        />
        {errors.hashtags && errors.hashtags.type === 'maxLength' && (
          <Text style={styles.errorText}>
            Hash Tags should consists maximum of 100 characters.
          </Text>
        )}
        {image ? (
          <>
            <Image source={{uri: image}} style={styles.uploadedImage} />
            <TouchableOpacity
              onPress={() => setImage(null)}
              activeOpacity={0.5}>
              <Text style={styles.imageButton}>Remove the image</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity onPress={() => imageHandler()} activeOpacity={0.5}>
            {/* <Text style={styles.imageButton}>Upload an image</Text> */}
          </TouchableOpacity>
        )}
        {post ? (
          <TouchableOpacity onPress={dialogHandler} activeOpacity={0.5}>
            <Text style={styles.deleteButton}>Delete the Post</Text>
          </TouchableOpacity>
        ) : null}
        <CameraOptionsModal
          showCameraOptions={showCameraOptions}
          setShowCameraOptions={setShowCameraOptions}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  errorText: {color: 'red'},
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  header: {
    borderBottomWidth: 1,
    height: normalize(50),
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: theme.colors.grey,
    justifyContent: 'space-between',
    paddingHorizontal: normalize(theme.spacing.small),
  },
  title: {
    fontSize: normalize(theme.fontSizes.large),
    paddingLeft: normalize(theme.spacing.large),
    color: theme.colors.primary,
  },
  postButton: {
    backgroundColor: theme.colors.primary,
    fontSize: normalize(theme.fontSizes.large),
    color: theme.colors.white,
    paddingHorizontal: normalize(theme.spacing.small),
    paddingVertical: normalize(theme.spacing.small),
    borderRadius: normalize(theme.spacing.small),
  },
  postForm: {
    flexGrow: 1,
    paddingHorizontal: '5%',
  },
  groupText: {
    color: 'orange',
    fontSize: normalize(theme.fontSizes.medium),
    paddingTop: normalize(theme.spacing.medium),
    alignSelf: 'center',
  },
  textareaContainer: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey,
  },
  textareaField: {
    textAlignVertical: 'top', // hack android
    paddingVertical: normalize(theme.spacing.small),
    fontSize: normalize(theme.fontSizes.medium),
    color: theme.colors.black,
  },
  dropdownLabel: {
    paddingTop: normalize(theme.spacing.large),
    fontSize: normalize(theme.fontSizes.small),
    color: theme.colors.primary,
  },
  picker: {
    borderWidth: 1,
    borderColor: theme.colors.red,
    color: theme.colors.black,
  },
  textField: {
    marginTop: normalize(theme.spacing.small),
    paddingVertical: normalize(theme.spacing.small),
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey,
    fontSize: normalize(theme.fontSizes.medium),
    color: theme.colors.black,
  },
  uploadedImage: {
    backgroundColor: 'red',
    width: normalize(200),
    height: normalize(200),
    marginTop: normalize(theme.spacing.small),
  },
  imageButton: {
    alignSelf: 'center',
    color: theme.colors.primary,
    fontSize: normalize(theme.fontSizes.mediumLarge),
    marginVertical: normalize(theme.spacing.small),
  },
  deleteButton: {
    alignSelf: 'center',
    color: theme.colors.red,
    fontSize: normalize(theme.fontSizes.mediumLarge),
    marginVertical: normalize(theme.spacing.large),
  },
  horizontalLine: {
    width: '100%',
    borderTopColor: theme.colors.grey,
    borderTopWidth: 1,
  },
});

export default CreatePost;
