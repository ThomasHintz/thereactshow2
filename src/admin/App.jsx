import * as React from "react";
import {
  Admin,
  Resource,
  List,
  Datagrid,
  NumberField,
  TextField,
  DateField,
  RichTextField,
  UrlField,
  ReferenceField,
  FileField,
  Show,
  Edit,
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  DateTimeInput,
  RadioButtonGroupInput,
  SelectInput,

  SimpleShowLayout,

  useGetList
} from 'react-admin';
import { RichTextInput } from 'ra-input-rich-text';
import simpleRestProvider from 'ra-data-simple-rest';

import { API_ADMIN_ROOT } from '@/paths';

export const UserList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="email" />
    </Datagrid>
  </List>
);

export const SubscriptionList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="uuid" />
      <ReferenceField source="user_id" reference="users" label="Email" link="show">
        <TextField source="email" />
      </ReferenceField>
      <DateField source="started_date" />
    </Datagrid>
  </List>
)

export const EpisodesList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <NumberField source="number" />
      <TextField source="title" />
      <NumberField source="episode" />
      <TextField source="slug" />
      <TextField source="episode_type" />
      <TextField source="buzzsprout_id" />
      <DateField source="pub_date" showTime={true} />
    </Datagrid>
  </List>
);

export const AudioFilesList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <FileField source="filename" title="filename" />
    </Datagrid>
  </List>
);

export const EpisodeShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <NumberField source="number" />
      <TextField source="title" />
      <NumberField source="season" />
      <NumberField source="episode" />
      <TextField source="slug" />
      <TextField source="episode_type" />
      <TextField source="buzzsprout_id" />
      <UrlField source="buzzsprout_url" />
      <UrlField source="youtube_url" />
      <UrlField source="audio_url" />
      <NumberField source="duration" label="Duration (seconds)" />
      <NumberField source="audio_size" label="Size (bytes)" />
      <FileField source="transcript_filename" title="transcript_filename" />
      <DateField source="pub_date" showTime={true} />
      <RichTextField source="content" />
      <TextField source="summary" />
    </SimpleShowLayout>
  </Show>
);

export const EpisodeEdit = () => {
  const { data: transcriptFiles } = useGetList(
    'transcript_files'
  );
  if (transcriptFiles) {
    return (
      <Edit>
        <SimpleForm>
          <TextInput source="number" />
          <TextInput source="title" fullWidth />
          <NumberInput source="season" />
          <NumberInput source="episode" />
          <TextInput source="slug" fullWidth />
          <RadioButtonGroupInput
            source="episode_type"
            choices={[
              { id: 'full', name: 'full' },
              { id: 'bonus', name: 'bonus' }
            ]}
          />
          <TextInput source="buzzsprout_id" />
          <TextInput source="buzzsprout_url" fullWidth />
          <TextInput source="youtube_url" fullWidth />
          <TextInput source="audio_url" fullWidth />
          <NumberInput source="duration" label="Duration (seconds)" />
          <NumberInput source="audio_size" label="Size (bytes)" />
          <SelectInput
            source="transcript_filename"
            choices={transcriptFiles.map(x => { return { id: x.filename, name: x.filename } })}
          />
          <DateTimeInput source="pub_date" />
          <RichTextInput source="content" />
          <TextInput source="summary" fullWidth />
        </SimpleForm>
      </Edit>
    );
  } else {
    return null;
  }
};

function listElement(arr, proc) {
  return arr && arr.length > 0 ? proc(arr[0]) : undefined;
};

export const EpisodeCreate = () => {
  const { data: lastNumber } = useGetList(
    'episodes',
    {
      pagination: { page: 1, perPage: 2 },
      sort: { field: 'number', order: 'DESC' }
    }
  );
  const { data: lastEpisode } = useGetList(
    'episodes',
    {
      pagination: { page: 1, perPage: 2 },
      sort: { field: 'episode', order: 'DESC' }
    }
  );
  const { data: transcriptFiles } = useGetList(
    'transcript_files'
  );
  if (lastNumber && lastEpisode && transcriptFiles) {
    return (
      <Create>
        <SimpleForm>
          <TextInput source="number" defaultValue={listElement(lastNumber, x => x.number + 1)} />
          <TextInput source="title" fullWidth />
          <NumberInput source="season" defaultValue="1" />
          <NumberInput source="episode" defaultValue={listElement(lastEpisode, x => x.episode + 1)} />
          <TextInput source="slug" fullWidth />
          <RadioButtonGroupInput
            source="episode_type"
            choices={[
              { id: 'full', name: 'full' },
              { id: 'bonus', name: 'bonus' }
            ]}
            defaultValue="full"
          />
          <TextInput
            source="buzzsprout_id"
            label="Buzzsprout ID"
            format={v => v && v.split('-').length > 0 ? v.split('-')[1] : ''}
            parse={v => `Buzzsprout-${v}`}
            defaultValue=""
          />
          <TextInput source="buzzsprout_url" fullWidth />
          <TextInput source="youtube_url" fullWidth />
          <TextInput source="audio_url" fullWidth />
          <NumberInput source="audio_size" label="Size (bytes)" />
          <NumberInput source="duration" label="Duration (seconds)" />
          <SelectInput
            source="transcript_filename"
            choices={transcriptFiles.map(x => { return { id: x.filename, name: x.filename } })}
          />
          <DateTimeInput source="pub_date" />
          <RichTextInput source="content" />
          <TextInput source="summary" fullWidth />
        </SimpleForm>
      </Create>
    );
  } else {
    return null;
  }
};


const App = () => (
  <Admin dataProvider={simpleRestProvider(API_ADMIN_ROOT)}>
    <Resource name="users" list={UserList} />
    <Resource name="subscriptions" list={SubscriptionList} />
    <Resource name="episodes" list={EpisodesList} show={EpisodeShow} edit={EpisodeEdit} create={EpisodeCreate} />
    <Resource name="transcript_files" list={AudioFilesList} />
  </Admin>
);

export default App;
